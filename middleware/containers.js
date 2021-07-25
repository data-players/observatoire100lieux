module.exports = [
  /**
   * Notes:
   *  - consumes -> Ressource
   *
   */
  {
    path: '/domains',
    acceptedTypes: ['pair:Domain']
  },
  {
    path: '/pendingorganizations',
    acceptedTypes: ['pair:Organization'],
    dereference: [
      'pair:hasLocation/pair:hasPostalAddress',
      'pair:hasBranch',
      'pair:hasDomain',
      'pair:hasTopic'
    ],
  },
  {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
    dereference: [
      'pair:hasLocation/pair:hasPostalAddress',
      'pair:hasBranch',
      'pair:hasDomain',
      'pair:hasTopic'
    ],
  },
  {
    path: '/tools',
    acceptedTypes: ['pair:Resource'],
    dereference: [
      'pair:hasType',
      'pair:hasBranch',
      'pair:hasDomain',
      'pair:hasTopic',
      'pair:offeredBy',
      'pair:producedBy'
    ],
  },
  {
    path: '/pendingtools',
    acceptedTypes: ['pair:Resource'],
    dereference: [
      'pair:hasType',
      'pair:hasBranch',
      'pair:hasDomain',
      'pair:hasTopic',
      'pair:offeredBy'
    ],
  },
  {
    path: '/themes',
    acceptedTypes: ['pair:Theme'],
    dereference: [
      'pair:hasType',
      'pair:hasBranch',
      'pair:hasDomain',
      'pair:topicOf',
    ],
  },
  {
    path: '/posters',
    acceptedTypes: ['pair:Resources'],
    dereference: [
        'pair:hasTopic'
    ]
  },
  {
    path: '/files'
  },
  {
    path: '/pendingfiles'
  },
  {
    path: '/users',
    acceptedTypes: ['pair:Person'],
    dereference: ['sec:publicKey', 'pair:hasLocation/pair:hasPostalAddress']
  },
  {
    path: '/sectors',
    acceptedTypes: 'pair:Sector',
    dereference: ['pair:extendedBy'],
  },
  {
    path: '/branchs',
    acceptedTypes: 'pair:Branch',
  },
  {
    path: '/persons',
    acceptedTypes: ['pair:Person']
  },
  {
    path: '/places',
    acceptedTypes: 'pair:place',
    dereference: ['pair:hasLocation/pair:hasPostalAddress']
  },

  {
    path: '/activities',
    acceptedTypes: 'pair:Activity',
    dereference: ['pair:hasLocation/pair:hasPostalAddress']
  },
  /*{
    path: '/places',
    acceptedTypes: 'pair:Place',
    dereference: ['pair:hasPostalAddress']
  },
  {
    path: '/documents',
    acceptedTypes: 'pair:Document'
  },
  {
    path: '/status',
    acceptedTypes: [
      'pair:Status',
      'pair:ActivityStatus',
      'pair:AgentStatus',
      'pair:DocumentStatus',
      'pair:EventStatus',
      'pair:IdeaStatus',
      'pair:ProjectStatus',
      'pair:TaskStatus'
    ]
  },
  {
    path: '/types',
    acceptedTypes: [
      'pair:Type',
      'pair:ActivityType',
      'pair:AgentType',
      'pair:ConceptType',
      'pair:DocumentType',
      'pair:EventType',
      'pair:FolderType',
      'pair:GroupType',
      'pair:IdeaType',
      'pair:ObjectType',
      'pair:OrganizationType',
      'pair:PlaceType',
      'pair:ProjectType',
      'pair:ResourceType',
      'pair:SubjectType',
      'pair:TaskType'
    ]
  },
  {
    path: '/pages'
  },
  {
    path: '/files'
  }*/
];
