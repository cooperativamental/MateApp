export type Mate = {
  "version": "0.1.0",
  "name": "mate",
  "instructions": [
    {
      "name": "createGroup",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "ratio",
          "type": "u16"
        },
        {
          "name": "members",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "createProject",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "group",
          "type": "string"
        },
        {
          "name": "projectType",
          "type": "string"
        },
        {
          "name": "ratio",
          "type": "u16"
        },
        {
          "name": "payments",
          "type": {
            "vec": {
              "defined": "Payment"
            }
          }
        },
        {
          "name": "commonExpenses",
          "type": "u64"
        },
        {
          "name": "currency",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "milestones",
          "type": "u8"
        },
        {
          "name": "startDate",
          "type": "u64"
        },
        {
          "name": "endDate",
          "type": "u64"
        },
        {
          "name": "client",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "payProject",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member3",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member4",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member5",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member6",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member7",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member8",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member9",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "useProjectTreasury",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "confirmProjectParticipation",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "rejectProjectParticipation",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateProject",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ratio",
          "type": "u16"
        },
        {
          "name": "payments",
          "type": {
            "vec": {
              "defined": "Payment"
            }
          }
        },
        {
          "name": "commonExpenses",
          "type": "u64"
        },
        {
          "name": "currency",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "milestones",
          "type": "u8"
        },
        {
          "name": "startDate",
          "type": "u64"
        },
        {
          "name": "endDate",
          "type": "u64"
        },
        {
          "name": "client",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "group",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "ratio",
            "type": "u16"
          },
          {
            "name": "members",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "project",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "group",
            "type": "string"
          },
          {
            "name": "projectType",
            "type": "string"
          },
          {
            "name": "ratio",
            "type": "u16"
          },
          {
            "name": "members",
            "type": {
              "vec": {
                "defined": "Member"
              }
            }
          },
          {
            "name": "currency",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "commonExpenses",
            "type": "u64"
          },
          {
            "name": "startDate",
            "type": "u64"
          },
          {
            "name": "endDate",
            "type": "u64"
          },
          {
            "name": "client",
            "type": "publicKey"
          },
          {
            "name": "milestones",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Payment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "member",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Member",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "status",
            "type": "string"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "GroupCreated",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "ratio",
          "type": "u16",
          "index": false
        },
        {
          "name": "members",
          "type": {
            "vec": "publicKey"
          },
          "index": false
        }
      ]
    },
    {
      "name": "ProjectCreated",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "group",
          "type": "string",
          "index": false
        },
        {
          "name": "projectType",
          "type": "string",
          "index": false
        },
        {
          "name": "ratio",
          "type": "u16",
          "index": false
        },
        {
          "name": "members",
          "type": {
            "vec": {
              "defined": "Member"
            }
          },
          "index": false
        },
        {
          "name": "currency",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "commonExpenses",
          "type": "u64",
          "index": false
        },
        {
          "name": "startDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "endDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "client",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "milestones",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectPaid",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectTreasuryUsed",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "receiver",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectRejected",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "causer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectParticipationConfirmed",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "member",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectSigned",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "group",
          "type": "string",
          "index": false
        },
        {
          "name": "projectType",
          "type": "string",
          "index": false
        },
        {
          "name": "ratio",
          "type": "u16",
          "index": false
        },
        {
          "name": "members",
          "type": {
            "vec": {
              "defined": "Member"
            }
          },
          "index": false
        },
        {
          "name": "currency",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "commonExpenses",
          "type": "u64",
          "index": false
        },
        {
          "name": "startDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "endDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "client",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "milestones",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "ProjectUpdated",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "group",
          "type": "string",
          "index": false
        },
        {
          "name": "projectType",
          "type": "string",
          "index": false
        },
        {
          "name": "ratio",
          "type": "u16",
          "index": false
        },
        {
          "name": "members",
          "type": {
            "vec": {
              "defined": "Member"
            }
          },
          "index": false
        },
        {
          "name": "currency",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "commonExpenses",
          "type": "u64",
          "index": false
        },
        {
          "name": "startDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "endDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "client",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "milestones",
          "type": "u8",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotMember",
      "msg": "User isn't a member of this project"
    },
    {
      "code": 6001,
      "name": "InvalidActionForProjectCurrentStatus",
      "msg": "Cannot perform the requested instruction because the current project status"
    },
    {
      "code": 6002,
      "name": "OnlyCanUpdateRejectedProjects",
      "msg": "Only rejected projects can be updated"
    }
  ]
};

export const IDL: Mate = {
  "version": "0.1.0",
  "name": "mate",
  "instructions": [
    {
      "name": "createGroup",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "ratio",
          "type": "u16"
        },
        {
          "name": "members",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "createProject",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "group",
          "type": "string"
        },
        {
          "name": "projectType",
          "type": "string"
        },
        {
          "name": "ratio",
          "type": "u16"
        },
        {
          "name": "payments",
          "type": {
            "vec": {
              "defined": "Payment"
            }
          }
        },
        {
          "name": "commonExpenses",
          "type": "u64"
        },
        {
          "name": "currency",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "milestones",
          "type": "u8"
        },
        {
          "name": "startDate",
          "type": "u64"
        },
        {
          "name": "endDate",
          "type": "u64"
        },
        {
          "name": "client",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "payProject",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member0",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member1",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member2",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member3",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member4",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member5",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member6",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member7",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member8",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member9",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "useProjectTreasury",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "confirmProjectParticipation",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "rejectProjectParticipation",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateProject",
      "accounts": [
        {
          "name": "project",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ratio",
          "type": "u16"
        },
        {
          "name": "payments",
          "type": {
            "vec": {
              "defined": "Payment"
            }
          }
        },
        {
          "name": "commonExpenses",
          "type": "u64"
        },
        {
          "name": "currency",
          "type": "string"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "milestones",
          "type": "u8"
        },
        {
          "name": "startDate",
          "type": "u64"
        },
        {
          "name": "endDate",
          "type": "u64"
        },
        {
          "name": "client",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "group",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "ratio",
            "type": "u16"
          },
          {
            "name": "members",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "project",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "group",
            "type": "string"
          },
          {
            "name": "projectType",
            "type": "string"
          },
          {
            "name": "ratio",
            "type": "u16"
          },
          {
            "name": "members",
            "type": {
              "vec": {
                "defined": "Member"
              }
            }
          },
          {
            "name": "currency",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "commonExpenses",
            "type": "u64"
          },
          {
            "name": "startDate",
            "type": "u64"
          },
          {
            "name": "endDate",
            "type": "u64"
          },
          {
            "name": "client",
            "type": "publicKey"
          },
          {
            "name": "milestones",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Payment",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "member",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Member",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubkey",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "status",
            "type": "string"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "GroupCreated",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "ratio",
          "type": "u16",
          "index": false
        },
        {
          "name": "members",
          "type": {
            "vec": "publicKey"
          },
          "index": false
        }
      ]
    },
    {
      "name": "ProjectCreated",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "group",
          "type": "string",
          "index": false
        },
        {
          "name": "projectType",
          "type": "string",
          "index": false
        },
        {
          "name": "ratio",
          "type": "u16",
          "index": false
        },
        {
          "name": "members",
          "type": {
            "vec": {
              "defined": "Member"
            }
          },
          "index": false
        },
        {
          "name": "currency",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "commonExpenses",
          "type": "u64",
          "index": false
        },
        {
          "name": "startDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "endDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "client",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "milestones",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectPaid",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectTreasuryUsed",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "receiver",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectRejected",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "causer",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectParticipationConfirmed",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "member",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "ProyectSigned",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "group",
          "type": "string",
          "index": false
        },
        {
          "name": "projectType",
          "type": "string",
          "index": false
        },
        {
          "name": "ratio",
          "type": "u16",
          "index": false
        },
        {
          "name": "members",
          "type": {
            "vec": {
              "defined": "Member"
            }
          },
          "index": false
        },
        {
          "name": "currency",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "commonExpenses",
          "type": "u64",
          "index": false
        },
        {
          "name": "startDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "endDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "client",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "milestones",
          "type": "u8",
          "index": false
        }
      ]
    },
    {
      "name": "ProjectUpdated",
      "fields": [
        {
          "name": "name",
          "type": "string",
          "index": false
        },
        {
          "name": "group",
          "type": "string",
          "index": false
        },
        {
          "name": "projectType",
          "type": "string",
          "index": false
        },
        {
          "name": "ratio",
          "type": "u16",
          "index": false
        },
        {
          "name": "members",
          "type": {
            "vec": {
              "defined": "Member"
            }
          },
          "index": false
        },
        {
          "name": "currency",
          "type": "string",
          "index": false
        },
        {
          "name": "status",
          "type": "string",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        },
        {
          "name": "commonExpenses",
          "type": "u64",
          "index": false
        },
        {
          "name": "startDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "endDate",
          "type": "u64",
          "index": false
        },
        {
          "name": "client",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "milestones",
          "type": "u8",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotMember",
      "msg": "User isn't a member of this project"
    },
    {
      "code": 6001,
      "name": "InvalidActionForProjectCurrentStatus",
      "msg": "Cannot perform the requested instruction because the current project status"
    },
    {
      "code": 6002,
      "name": "OnlyCanUpdateRejectedProjects",
      "msg": "Only rejected projects can be updated"
    }
  ]
};
