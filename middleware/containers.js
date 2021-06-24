module.exports = [
  /**
   * Notes:
   *  - consumes -> Ressource
   *
   */
  {
    path: '/organizations',
    acceptedTypes: ['pair:Organization'],
  },
  {
    path: '/physicalPlaces',
    acceptedTypes: ['pair:PhysicalPlace'],
  },
  {
    path: '/sectors',
    acceptedTypes: 'pair:Sector',
    dereference: ['pair:extendedBy'],

  },
  {
    path: '/branchs',
    acceptedTypes: 'pair:Branch',
    dereference: ['pair:extends'],
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
