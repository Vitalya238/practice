let openapi = {
    openapi: '3.0.1',
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
        }
    }
};

module.exports = openapi;
