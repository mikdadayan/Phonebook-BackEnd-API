# phonebook-backend-api

## To run this application

1. `git clone https://github.com/mikdadayan/tournaments-search-for-deploy-backend.git`
2. `npm install`
3. `npm start`

## Or Simply run

1. `git clone https://github.com/mikdadayan/tournaments-search-for-deploy-backend.git`
2. `docker-compose up --build`


## Here is an explanation of how to configure form with config file

The db file inside of `./config/db.js` contains setup to connect mongodb.

1. `MONGO_URI` - Your MongoDB URI

## Contact Endpoints Description

```javascript
contact: [
  {
    name: "Create New Contact",
    request: {
      method: "POST",
      body: {
        mode: "raw",
        raw:
          '{\r\n    "first_name": "John",\r\n    "last_name": "Doe",\r\n    "phone_number": "+37447226663",\r\n    "groups": ["groupId"]\r\n}',
        options: {
          raw: {
            language: "json",
          },
        },
      },
      url: {
        raw: "http://localhost:5000/api/contacts/",
        protocol: "http",
        host: ["localhost"],
        port: "5000",
        path: ["api", "contacts", ""],
      },
    },
    response: {
      message: "Operation message",
      createdContact: {},
    },
  },
  {
    name: "Edit Existing Contact",
    request: {
      method: "PUT",
      body: {
        mode: "raw",
        raw:
          '{\r\n    "first_name": "John",\r\n    "last_name": "Doe",\r\n    "phone_number": "+37447226663",\r\n    "groups": ["6049140b1e37982b70bf2c80"]\r\n}',
        options: {
          raw: {
            language: "json",
          },
        },
      },
      url: {
        raw: "http://localhost:5000/api/contacts/:contactId",
        protocol: "http",
        host: ["localhost"],
        port: "5000",
        path: ["api", "contacts", "contactId"],
      },
    },
    response: {
      message: "Operation message",
      updatedContact: {},
    },
  },
  {
    name: "Delete Contact",
    request: {
      method: "DELETE",
      url: {
        raw: "http://localhost:5000/api/contacts/:contactId",
        protocol: "http",
        host: ["localhost"],
        port: "5000",
        path: ["api", "contacts", "contactId"],
      },
    },
    response: {
      message: "Operation message",
    },
  },
  {
    name: "Get All Contacts",
    request: {
      method: "GET",
      url: {
        raw: "http://localhost:5000/api/contacts/",
        protocol: "http",
        host: ["localhost"],
        port: "5000",
        path: ["api", "contacts", ""],
      },
    },
    response: {
      message: "Operation message",
      allContacts: [{}],
    },
  },
  {
    name: "Get Single Contact",
    request: {
      method: "GET",
      url: {
        raw: "http://localhost:5000/api/contacts/:contactId",
        protocol: "http",
        host: ["localhost"],
        port: "5000",
        path: ["api", "contacts", "contactId"],
      },
      description: "Get single contact by contact id.",
    },
    response: {
      message: "Operation message",
      contact: {},
    },
  },
  {
    name: "Search Contact by Name and Phone Number",
    request: {
      method: "GET",
      url: {
        raw:
          'http://localhost:5000/api/contacts/search?phone_number="3744722"&name="John"',
        protocol: "http",
        host: ["localhost"],
        port: "5000",
        path: ["api", "contacts", "search"],
        query: [
          {
            key: "phone_number",
            value: '"3744722"',
          },
          {
            key: "name",
            value: '"John"',
          },
        ],
      },
      description: "Search contact by name or phone number\r\n",
    },
    response: {
      message: "Operation message",
      searchedContacts: [{}],
    },
  },
  {
    name: "Get All In .CSV FIle",
    request: {
      method: "GET",
      url: {
        raw: "http://localhost:5000/api/contacts/download",
        protocol: "http",
        host: ["localhost"],
        port: "5000",
        path: ["api", "contacts", "download"],
      },
      description: "Download contacts to .csv file",
    },
    response: ".csv file",
  },
];
```

## Group Endpoints Description

```javascript
{
  group: [
    {
      name: "Create Group",
      request: {
        method: "POST",
        header: [],
        body: {
          mode: "raw",
          raw: '{\r\n    "group_name": "Rock"\r\n}',
          options: {
            raw: {
              language: "json",
            },
          },
        },
        url: {
          raw: "http://localhost:5000/api/groups/",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["api", "groups", ""],
        },
      },
      response: {
        message: "Operation message",
        createdGroup: {},
      },
    },
    {
      name: "Delete Group",
      request: {
        method: "DELETE",
        header: [],
        url: {
          raw: "http://localhost:5000/api/groups/:groupId",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["api", "groups", "groupId"],
        },
      },
      response: {
        message: "Operation message",
      },
    },
    {
      name: "Edit Group",
      request: {
        method: "PUT",
        header: [],
        body: {
          mode: "raw",
          raw: '{\r\n    "group_name": "Jazz"\r\n}',
          options: {
            raw: {
              language: "json",
            },
          },
        },
        url: {
          raw: "http://localhost:5000/api/groups/:groupId",
          protocol: "http",
          host: ["localhost"],
          port: "5000",
          path: ["api", "groups", "groupId"],
        },
      },
      response: {
        message: "Operation message",
        updatedGroup: {},
      },
    },
  ];
}
```
