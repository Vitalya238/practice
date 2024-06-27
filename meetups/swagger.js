let openapi = {
    openapi: '3.0.1',
    components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'access-token'
            }
        }
    },
    security: [
        {
            cookieAuth: []
        }
    ],
    paths: {
        '/meetups': {
            get: {
                tags: ['Meetups'],
                summary: 'Get all meetups',
                operationId: 'getAllMeetup',
                responses: {
                    '200': {
                        description: 'List of meetups',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'string' },
                                            title: { type: 'string' },
                                            description: { type: 'string' },
                                            tags: {
                                                type: 'array',
                                                items: { type: 'string' }
                                            },
                                            event_time: {
                                                type: 'string',
                                                format: 'date-time'
                                            },
                                            location: { type: 'string' }
                                        }
                                    }
                                },
                                example: [
                                    {
                                        id: '2',
                                        title: 'asd',
                                        description: 'test description',
                                        tags: ['asd', 'test'],
                                        event_time: '1999-06-19T15:30:00.000Z',
                                        location: 'test'
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Meetups'],
                summary: 'Create a new meetup',
                operationId: 'createMeetup',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    title: { type: 'string' },
                                    description: { type: 'string' },
                                    tags: {
                                        type: 'array',
                                        items: { type: 'string' }
                                    },
                                    event_time: {
                                        type: 'string',
                                        format: 'date-time'
                                    },
                                    location: { type: 'string' }
                                },
                                required: ['id', 'title', 'event_time', 'location']
                            },
                            example: {
                                id: '2',
                                title: 'asd',
                                description: 'test description',
                                tags: ['asd', 'test'],
                                event_time: '1999-06-19T15:30:00.000Z',
                                location: 'test'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Meetup created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Meetup created successfully'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Invalid input, object invalid',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Invalid input'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/meetups/{id}': {
            get: {
                tags: ['Meetups'],
                summary: 'Get a meetup by ID',
                operationId: 'getMeetupById',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID of the meetup to get'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Meetup found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        title: { type: 'string' },
                                        description: { type: 'string' },
                                        tags: {
                                            type: 'array',
                                            items: { type: 'string' }
                                        },
                                        event_time: {
                                            type: 'string',
                                            format: 'date-time'
                                        },
                                        location: { type: 'string' }
                                    }
                                },
                                example: {
                                    id: '2',
                                    title: 'asd',
                                    description: 'test description',
                                    tags: ['asd', 'test'],
                                    event_time: '1999-06-19T15:30:00.000Z',
                                    location: 'test'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Meetup not found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Meetup not found'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['Meetups'],
                summary: 'Update a meetup by ID',
                operationId: 'updateMeetupById',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID of the meetup to update'
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    description: { type: 'string' },
                                    tags: {
                                        type: 'array',
                                        items: { type: 'string' }
                                    },
                                    event_time: {
                                        type: 'string',
                                        format: 'date-time'
                                    },
                                    location: { type: 'string' }
                                }
                            },
                            example: {
                                title: 'Updated asd',
                                description: 'updated test description',
                                tags: ['updated', 'test'],
                                event_time: '2024-08-01T18:00:00Z',
                                location: 'updated test'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Meetup updated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Meetup updated successfully'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Invalid input, object invalid',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Invalid input'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Meetup not found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Meetup not found'
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['Meetups'],
                summary: 'Delete a meetup by ID',
                operationId: 'deleteMeetupById',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        },
                        description: 'ID of the meetup to delete'
                    }
                ],
                responses: {
                    '204': {
                        description: 'Meetup deleted successfully'
                    },
                    '404': {
                        description: 'Meetup not found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Meetup not found'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/auth/register': {
            post: {
                tags: ['Auth'],
                summary: 'Register a new user',
                operationId: 'registerUser',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    password: { type: 'string' },
                                    role: { type: 'string' }
                                },
                                required: ['username', 'password', 'role'],
                                example: {
                                    username: 'org2',
                                    password: '123',
                                    role: 'organizer'
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'User registered successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' },
                                        user: {
                                            type: 'object',
                                            properties: {
                                                username: { type: 'string' },
                                                role: { type: 'string' },
                                                refresh_token: { type: 'string' }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    message: 'User registered successfully',
                                    user: {
                                        username: 'newuser',
                                        role: 'user',
                                        refresh_token: 'example_refresh_token'
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Username already exists',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Username already exists'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/meetups/subscribe': {
            post: {
                tags: ['Meetups'],
                summary: 'Subscribe to a meetup',
                operationId: 'subscribeToMeetup',
                security: [
                    {
                        cookieAuth: []
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    meetupid: {
                                        type: 'string'
                                    }
                                },
                                required: ['meetupid']
                            },
                            example: {
                                meetupid: '1'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Meetup subscription successful',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        userid: { type: 'string' },
                                        meetupid: { type: 'string' }
                                    },
                                    example: {
                                        userid: 'user_id_example',
                                        meetupid: 'meetup_id_example'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Unauthorized'
                                }
                            }
                        }
                    },
                    '403': {
                        description: 'Invalid token',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Invalid token'
                                }
                            }
                        }
                    },
                    '409': {
                        description: 'User already subscribed to the meetup',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: '[ERROR] 409: userMeetup already exists.'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal Server Error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Internal Server Error'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/auth/login': {
            post: {
                tags: ['Auth'],
                summary: 'Login a user',
                operationId: 'loginUser',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    password: { type: 'string' }
                                },
                                required: ['username', 'password'],
                                example: {
                                    username: 'org2',
                                    password: '123'
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Login successful',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Login successful'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Invalid username or password',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: { type: 'string' }
                                    }
                                },
                                example: {
                                    message: 'Invalid username or password'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/auth/logout': {
            post: {
                tags: ['Auth'],
                summary: 'Logout',
                operationId: 'logout',
                responses: {
                    '200': {
                        description: 'Logout successful',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'Logout successful'
                                        }
                                    }
                                },
                                example: {
                                    message: 'Login successful'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal Server Error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'Error during logout'
                                        }
                                    }
                                },
                                example: {
                                    message: 'Invalid username or password'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = openapi;
