import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';

const getInitialPlayerData = () => {
  const saved = localStorage.getItem('playerData');
  if (saved) return JSON.parse(saved);
  return {
    name: "Java Developer",
    level: 1,
    totalXP: 0,
    attributes: {
      javaCore: { level: 1, xp: 0, maxXP: 100 },
      springBoot: { level: 1, xp: 0, maxXP: 100 },
      database: { level: 1, xp: 0, maxXP: 100 },
      architecture: { level: 1, xp: 0, maxXP: 100 },
      testing: { level: 1, xp: 0, maxXP: 100 },
      deployment: { level: 1, xp: 0, maxXP: 100 }
    }
  };
};

const getInitialAchievements = () => {
  const saved = localStorage.getItem('achievements');
  if (saved) return JSON.parse(saved);
  return [];
};

const JavaLearningRPG = () => {
  const [playerData, setPlayerData] = useState(getInitialPlayerData());
  const [achievements, setAchievements] = useState(getInitialAchievements());
  const [selectedActivity, setSelectedActivity] = useState('');
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    localStorage.setItem('playerData', JSON.stringify(playerData));
  }, [playerData]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);
  // Activity definitions with XP rewards and attribute targeting
  const activities = {
    // Java Core Activities (Granular)
    'watch-java-videos': { 
      name: 'Watch Java Course Videos', 
      xp: 10, 
      attribute: 'javaCore',
      description: 'Completed watching videos for a course section'
    },
    'complete-java-exercises': { 
      name: 'Complete Course Exercises', 
      xp: 15, 
      attribute: 'javaCore',
      description: 'Finished coding exercises from course section'
    },
    'read-effective-java-item': { 
      name: 'Read Effective Java Item', 
      xp: 10, 
      attribute: 'javaCore',
      description: 'Studied single item from Effective Java book'
    },
    'implement-design-pattern': { 
      name: 'Implement Design Pattern', 
      xp: 15, 
      attribute: 'javaCore',
      description: 'Created example of Builder, Factory, Strategy, etc.'
    },
    'solve-coding-challenge': { 
      name: 'Solve Coding Challenge', 
      xp: 12, 
      attribute: 'javaCore',
      description: 'Completed LeetCode/HackerRank problem'
    },
    'refactor-with-streams': { 
      name: 'Refactor Code with Streams', 
      xp: 12, 
      attribute: 'javaCore',
      description: 'Replaced loops with stream operations'
    },
    'add-exception-handling': { 
      name: 'Add Exception Handling', 
      xp: 10, 
      attribute: 'javaCore',
      description: 'Added try-catch and custom exceptions to code'
    },
    
    // Spring Boot Activities (Granular)
    'watch-spring-videos': { 
      name: 'Watch Spring Course Videos', 
      xp: 12, 
      attribute: 'springBoot',
      description: 'Completed watching Spring Boot course section'
    },
    'create-endpoint-handler': { 
      name: 'Create REST Endpoint Handler', 
      xp: 15, 
      attribute: 'springBoot',
      description: 'Built basic endpoint structure with @RestController'
    },
    'add-endpoint-validation': { 
      name: 'Add Input Validation', 
      xp: 10, 
      attribute: 'springBoot',
      description: 'Added @Valid and validation annotations'
    },
    'implement-error-responses': { 
      name: 'Implement Error Responses', 
      xp: 12, 
      attribute: 'springBoot',
      description: 'Added proper HTTP status codes and error handling'
    },
    'test-endpoint-postman': { 
      name: 'Test Endpoint with Postman', 
      xp: 8, 
      attribute: 'springBoot',
      description: 'Manually tested API endpoints'
    },
    'add-spring-configuration': { 
      name: 'Add Spring Configuration', 
      xp: 10, 
      attribute: 'springBoot',
      description: 'Configured application.properties or created @Configuration'
    },
    'setup-spring-profiles': { 
      name: 'Setup Application Profiles', 
      xp: 12, 
      attribute: 'springBoot',
      description: 'Created dev/test/prod profile configurations'
    },
    'add-actuator-endpoints': { 
      name: 'Add Actuator Endpoints', 
      xp: 8, 
      attribute: 'springBoot',
      description: 'Added health checks and monitoring endpoints'
    },
    
    // Database Activities (Granular)
    'setup-database-connection': { 
      name: 'Setup Database Connection', 
      xp: 15, 
      attribute: 'database',
      description: 'Connected PostgreSQL/H2 to Spring Boot application'
    },
    'create-jpa-entity': { 
      name: 'Create JPA Entity', 
      xp: 12, 
      attribute: 'database',
      description: 'Created single entity class with proper annotations'
    },
    'define-entity-relationships': { 
      name: 'Define Entity Relationships', 
      xp: 15, 
      attribute: 'database',
      description: 'Added @OneToMany, @ManyToOne, or @ManyToMany relationships'
    },
    'create-repository-interface': { 
      name: 'Create Repository Interface', 
      xp: 10, 
      attribute: 'database',
      description: 'Created Spring Data JPA repository'
    },
    'add-custom-queries': { 
      name: 'Add Custom Database Queries', 
      xp: 15, 
      attribute: 'database',
      description: 'Wrote @Query or method name queries'
    },
    'create-migration-script': { 
      name: 'Create Migration Script', 
      xp: 12, 
      attribute: 'database',
      description: 'Added Flyway/Liquibase database migration'
    },
    'seed-test-data': { 
      name: 'Seed Test Data', 
      xp: 8, 
      attribute: 'database',
      description: 'Added sample data for development/testing'
    },
    'add-transaction-boundaries': { 
      name: 'Add Transaction Boundaries', 
      xp: 12, 
      attribute: 'database',
      description: 'Added @Transactional annotations appropriately'
    },
    
    // Architecture Activities (Granular)
    'read-microservices-chapter': { 
      name: 'Read Microservices Chapter', 
      xp: 12, 
      attribute: 'architecture',
      description: 'Completed chapter from Building Microservices book'
    },
    'design-service-boundaries': { 
      name: 'Design Service Boundaries', 
      xp: 15, 
      attribute: 'architecture',
      description: 'Planned how to split monolith into services'
    },
    'create-new-service-project': { 
      name: 'Create New Service Project', 
      xp: 20, 
      attribute: 'architecture',
      description: 'Set up new Spring Boot microservice from scratch'
    },
    'implement-service-communication': { 
      name: 'Implement Service Communication', 
      xp: 18, 
      attribute: 'architecture',
      description: 'Added REST calls between services'
    },
    'add-circuit-breaker': { 
      name: 'Add Circuit Breaker Pattern', 
      xp: 15, 
      attribute: 'architecture',
      description: 'Implemented resilience pattern for service calls'
    },
    'create-api-documentation': { 
      name: 'Create API Documentation', 
      xp: 12, 
      attribute: 'architecture',
      description: 'Added OpenAPI/Swagger docs for service'
    },
    'setup-service-discovery': { 
      name: 'Setup Service Discovery', 
      xp: 18, 
      attribute: 'architecture',
      description: 'Configured service registration and discovery'
    },
    'implement-api-gateway': { 
      name: 'Implement API Gateway', 
      xp: 20, 
      attribute: 'architecture',
      description: 'Set up routing and load balancing'
    },
    
    // Testing Activities (Granular)
    'write-unit-test-class': { 
      name: 'Write Unit Test Class', 
      xp: 10, 
      attribute: 'testing',
      description: 'Created comprehensive tests for one service/class'
    },
    'achieve-test-coverage-milestone': { 
      name: 'Achieve 80% Test Coverage', 
      xp: 15, 
      attribute: 'testing',
      description: 'Hit test coverage target for module'
    },
    'add-mockito-tests': { 
      name: 'Add Mockito Tests', 
      xp: 12, 
      attribute: 'testing',
      description: 'Added mocking to isolate dependencies'
    },
    'test-edge-cases': { 
      name: 'Test Edge Cases', 
      xp: 10, 
      attribute: 'testing',
      description: 'Added boundary and error condition tests'
    },
    'write-integration-tests': { 
      name: 'Write Integration Tests', 
      xp: 15, 
      attribute: 'testing',
      description: 'Created tests for database/API integration'
    },
    'setup-testcontainers': { 
      name: 'Setup TestContainers', 
      xp: 18, 
      attribute: 'testing',
      description: 'Added container-based integration testing'
    },
    'create-test-data-builders': { 
      name: 'Create Test Data Builders', 
      xp: 10, 
      attribute: 'testing',
      description: 'Built helper classes for test data creation'
    },
    'refactor-test-suite': { 
      name: 'Refactor Test Suite', 
      xp: 12, 
      attribute: 'testing',
      description: 'Cleaned up and organized existing tests'
    },
    'add-performance-tests': { 
      name: 'Add Performance Tests', 
      xp: 15, 
      attribute: 'testing',
      description: 'Created load/stress tests for critical paths'
    },
    
    // Deployment Activities (Granular)
    'create-dockerfile': { 
      name: 'Create Dockerfile', 
      xp: 12, 
      attribute: 'deployment',
      description: 'Wrote Dockerfile for application containerization'
    },
    'setup-docker-compose': { 
      name: 'Setup Docker Compose', 
      xp: 15, 
      attribute: 'deployment',
      description: 'Created multi-container development environment'
    },
    'configure-build-pipeline': { 
      name: 'Configure Build Pipeline', 
      xp: 18, 
      attribute: 'deployment',
      description: 'Set up GitHub Actions/Jenkins build automation'
    },
    'add-automated-tests-pipeline': { 
      name: 'Add Automated Tests to Pipeline', 
      xp: 15, 
      attribute: 'deployment',
      description: 'Integrated test execution in CI/CD'
    },
    'setup-environment-configs': { 
      name: 'Setup Environment Configs', 
      xp: 10, 
      attribute: 'deployment',
      description: 'Created separate configs for dev/staging/prod'
    },
    'deploy-to-staging': { 
      name: 'Deploy to Staging Environment', 
      xp: 15, 
      attribute: 'deployment',
      description: 'Successfully deployed to staging server'
    },
    'setup-monitoring': { 
      name: 'Setup Application Monitoring', 
      xp: 15, 
      attribute: 'deployment',
      description: 'Added metrics, logging, or health checks'
    },
    'deploy-to-cloud': { 
      name: 'Deploy to Cloud Platform', 
      xp: 20, 
      attribute: 'deployment',
      description: 'Deployed to AWS/Azure/GCP/Heroku'
    },
    'setup-database-backups': { 
      name: 'Setup Database Backups', 
      xp: 12, 
      attribute: 'deployment',
      description: 'Configured automated database backup strategy'
    }
  };

  // Achievement definitions
  const achievementDefs = [
    { id: 'first-steps', name: 'First Steps', description: 'Complete your first activity', threshold: 1 },
    { id: 'java-padawan', name: 'Java Padawan', description: 'Reach Java Core Level 3', attribute: 'javaCore', level: 3 },
    { id: 'spring-warrior', name: 'Spring Warrior', description: 'Reach Spring Boot Level 5', attribute: 'springBoot', level: 5 },
    { id: 'data-master', name: 'Data Master', description: 'Reach Database Level 4', attribute: 'database', level: 4 },
    { id: 'architect', name: 'System Architect', description: 'Reach Architecture Level 4', attribute: 'architecture', level: 4 },
    { id: 'testing-guru', name: 'Testing Guru', description: 'Reach Testing Level 5', attribute: 'testing', level: 5 },
    { id: 'devops-ninja', name: 'DevOps Ninja', description: 'Reach Deployment Level 4', attribute: 'deployment', level: 4 },
    { id: 'level-10', name: 'Senior Developer', description: 'Reach Player Level 10', threshold: 10 },
    { id: 'month-1', name: 'Month 1 Complete', description: 'Finish Month 1 milestones', xpThreshold: 500 },
    { id: 'project-complete', name: 'Project Master', description: 'Complete the wealth aggregator project', xpThreshold: 2000 }
  ];

  // Calculate player level based on total XP
  const calculatePlayerLevel = (xp) => Math.floor(xp / 100) + 1;

  // Award XP for activity
  const awardXP = () => {
    if (!selectedActivity) return;

    const activity = activities[selectedActivity];
    const newPlayerData = { ...playerData };
    
    // Add to total XP
    newPlayerData.totalXP += activity.xp;
    const newLevel = calculatePlayerLevel(newPlayerData.totalXP);
    const leveledUp = newLevel > newPlayerData.level;
    newPlayerData.level = newLevel;

    // Add to specific attribute
    const attr = newPlayerData.attributes[activity.attribute];
    attr.xp += activity.xp;
    
    // Level up attribute if needed
    while (attr.xp >= attr.maxXP) {
      attr.xp -= attr.maxXP;
      attr.level += 1;
      attr.maxXP = Math.floor(attr.maxXP * 1.2); // Increase XP needed for next level
    }

    setPlayerData(newPlayerData);
    
    // Check for new achievements
    checkAchievements(newPlayerData);
    
    if (leveledUp) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    
    setSelectedActivity('');
  };

  // Check for new achievements
  const checkAchievements = (data) => {
    const newAchievements = [];
    
    achievementDefs.forEach(ach => {
      if (achievements.includes(ach.id)) return;
      
      let earned = false;
      if (ach.threshold && data.totalXP >= ach.threshold * 25) earned = true;
      if (ach.xpThreshold && data.totalXP >= ach.xpThreshold) earned = true;
      if (ach.level && ach.attribute && data.level >= ach.threshold) earned = true;
      if (ach.attribute && data.attributes[ach.attribute].level >= ach.level) earned = true;
      
      if (earned) {
        newAchievements.push(ach.id);
      }
    });
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
    }
  };

  // Attribute icons
  const getAttributeIcon = (attrName) => {
    const icons = {
      javaCore: <Lucide.Code className="w-6 h-6" />,
      springBoot: <Lucide.Zap className="w-6 h-6" />,
      database: <Lucide.Database className="w-6 h-6" />,
      architecture: <Lucide.Shield className="w-6 h-6" />,
      testing: <Lucide.Book className="w-6 h-6" />,
      deployment: <Lucide.Trophy className="w-6 h-6" />
    };
    return icons[attrName];
  };

  const getAttributeColor = (attrName) => {
    const colors = {
      javaCore: 'bg-blue-500',
      springBoot: 'bg-green-500',
      database: 'bg-purple-500',
      architecture: 'bg-yellow-500',
      testing: 'bg-red-500',
      deployment: 'bg-indigo-500'
    };
    return colors[attrName];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Java Developer RPG
          </h1>
          <p className="text-xl text-gray-300">Level up your Java and Spring Boot skills!</p>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-center mb-4">{playerData.name}</h2>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">Level {playerData.level}</div>
              <div className="text-sm text-gray-400">Total XP: {playerData.totalXP}</div>
              <div className="mt-4 bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{width: `${(playerData.totalXP % 100)}%`}}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {playerData.totalXP % 100}/100 XP to next level
              </div>
            </div>
          </div>

          {/* Activity Selector */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-center">Complete Activity</h3>
            <select 
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 mb-4 text-white"
            >
              <option value="">Select an activity...</option>
              {Object.entries(activities).map(([key, activity]) => (
                <option key={key} value={key}>
                  {activity.name} (+{activity.xp} XP)
                </option>
              ))}
            </select>
            
            {selectedActivity && (
              <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
                <div className="text-sm text-gray-300">
                  {activities[selectedActivity].description}
                </div>
                <div className="text-xs text-blue-400 mt-1">
                  +{activities[selectedActivity].xp} XP to {activities[selectedActivity].attribute}
                </div>
              </div>
            )}
            
            <button 
              onClick={awardXP}
              disabled={!selectedActivity}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              Complete Activity
            </button>
          </div>

          {/* Achievements */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
              <Lucide.Trophy className="w-5 h-5 text-yellow-400" />
              Achievements
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {achievements.length === 0 ? (
                <p className="text-gray-500 text-center text-sm">No achievements yet</p>
              ) : (
                achievements.map(achId => {
                  const ach = achievementDefs.find(a => a.id === achId);
                  return (
                    <div key={achId} className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-2">
                      <div className="font-bold text-yellow-400 text-sm">{ach.name}</div>
                      <div className="text-xs text-yellow-300">{ach.description}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(playerData.attributes).map(([attrName, attr]) => (
            <div key={attrName} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${getAttributeColor(attrName)}`}>
                  {getAttributeIcon(attrName)}
                </div>
                <div>
                  <h3 className="font-bold capitalize text-lg">
                    {attrName.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="text-sm text-gray-400">Level {attr.level}</div>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>XP Progress</span>
                  <span>{attr.xp}/{attr.maxXP}</span>
                </div>
                <div className="bg-slate-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${getAttributeColor(attrName)}`}
                    style={{width: `${(attr.xp / attr.maxXP) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Level Up Animation */}
        {showLevelUp && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-8 rounded-xl text-center transform animate-bounce">
              <h2 className="text-4xl font-bold mb-2">LEVEL UP!</h2>
              <p className="text-xl">You reached Level {playerData.level}!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JavaLearningRPG;