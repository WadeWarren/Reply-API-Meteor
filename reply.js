let apiMethods = {
  people: {
    list({
        page = false
      } = {}) {
        let endPoint = '/people';
        if (page) {
          endPoint = `/people?page=${page}&limit=100`;
        };
        return {
          type: 'GET',
          endPoint,
        };
      },
      find({
        id = false, email = false
      } = {}) {
        let endPoint = "";
        if (id) {
          endPoint = `/people/${id}`
        } else if (email) {
          endPoint = `/people?email=${encodeURIComponent(email)}`
        } else {
          throw new Meteor.Error('missing-params');
        };
        return {
          type: 'GET',
          endPoint,
        };
      },
      stats({
        email = false
      } = {}) {
        if (!email) {
          throw new Meteor.Error('missing-params', 'Please provide email');
        };
        return {
          type: 'GET',
          endPoint: `/stats/person?email=${encodeURIComponent(email)}`,
        };
      },
      add() {
        return {
          type: 'POST',
          endPoint: '/people'
        };
      },
      update() {
        return {
          type: 'PUT',
          endPoint: '/people'
        };
      },
      remove({
        id = false, email = false
      } = {}) {
        let endPoint = "";
        if (id) {
          endPoint = `/people/${id}`
        } else if (email) {
          endPoint = `/people?email=${email}`
        } else {
          throw new Meteor.Error('missing-params');
        };
        return {
          type: 'DELETE',
          endPoint,
        };
      },
  },
  campaigns: {
    list() {
        return {
          type: 'GET',
          endPoint: '/campaigns',
        };
      },
      find({
        id = false, name = false
      } = {}) {
        let endPoint = "";
        if (id) {
          endPoint = `/campaigns/${id}`;
        } else if (email) {
          endPoint = `/campaigns?name=${encodeURIComponent(name)}`;
        } else {
          throw new Meteor.Error('missing-params');
        };
        return {
          type: 'GET',
          endPoint,
        };
      },
      // takes an object {campaignId, email}
      add() {
        return {
          type: 'POST',
          endPoint: '/actions/pushtocampaign',
        };
      },
      // takes an object {campaignId, email, firstName, lastName, etc}
      addPerson() {
        return {
          type: 'POST',
          endPoint: '/actions/addandpushtocampaign',
        };
      },
  },
};

Reply = class {
  constructor(apiKey) {
    this.url = 'https://run.replyapp.io/api/v1';
    this.apiKey = apiKey;
    this.methods = apiMethods;
  }
  buildReqArguments(type, options) {
    options = options || {};
    let payload = {
      headers: {
        'X-Api-Key': this.apiKey
      },
    };
    if (type === 'POST' || type === "PUT") {
      payload.data = options
    };
    return payload;
  }
  request(call, options) {
    let payload = this.buildReqArguments(call.type, options);
    try {
      let response = HTTP.call(call.type, this.url + call.endPoint, payload);

      if (response.content) {
        return JSON.parse(response.content);
      } else {
        return response.statusCode;
      };
    } catch (e) {
      throw new Meteor.Error('http-error', e.toString());
    };
  }
  action(actionName, method, params) {
    let call = this.methods[actionName][method](params);
    return this.request(call, params);
  }
  people(method, params) {
    return this.action('people', method, params);
  }
  campaigns(method, params) {
    return this.action('campaigns', method, params);
  }
};
