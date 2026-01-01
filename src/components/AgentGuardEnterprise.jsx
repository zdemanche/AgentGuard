import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, TrendingUp, Cpu, Lock,
         CheckCircle, XCircle, Clock, DollarSign, Users, Server,
         FileText, Settings, BarChart3, Zap, Globe, Database,
         Eye, PlayCircle, PauseCircle, RefreshCw } from 'lucide-react';

/**
 * AgentGuard Enterprise Platform
 * Production-grade AI Agent Security, Compliance & Deployment Platform
 *
 * Features:
 * - Real-time security monitoring and threat detection
 * - AI agent deployment workflow with validation
 * - Compliance tracking (SOC 2, GDPR, HIPAA, ISO 27001)
 * - Cost and performance analytics
 * - Enterprise-grade dashboard
 */

const AgentGuardEnterprise = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [alertsViewed, setAlertsViewed] = useState(false);
  const [isEditingAgent, setIsEditingAgent] = useState(false);
  const [editedAgent, setEditedAgent] = useState(null);

  // Sample enterprise agents data
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Customer Support AI',
      department: 'Customer Service',
      status: 'active',
      environment: 'production',
      version: 'v2.3.1',
      requests: 12453,
      avgResponseTime: 1.2,
      successRate: 99.7,
      costPerDay: 145.23,
      threats: 2,
      lastDeployed: '2026-01-01T10:30:00Z',
      compliance: ['SOC 2', 'GDPR'],
      securityScore: 98
    },
    {
      id: 2,
      name: 'Data Analytics Agent',
      department: 'Analytics',
      status: 'active',
      environment: 'production',
      version: 'v1.8.2',
      requests: 8234,
      avgResponseTime: 2.1,
      successRate: 98.9,
      costPerDay: 234.56,
      threats: 0,
      lastDeployed: '2025-12-28T14:20:00Z',
      compliance: ['SOC 2', 'HIPAA', 'ISO 27001'],
      securityScore: 99
    },
    {
      id: 3,
      name: 'HR Assistant',
      department: 'Human Resources',
      status: 'active',
      environment: 'production',
      version: 'v3.1.0',
      requests: 5678,
      avgResponseTime: 1.5,
      successRate: 99.5,
      costPerDay: 89.12,
      threats: 1,
      lastDeployed: '2025-12-30T09:15:00Z',
      compliance: ['GDPR', 'HIPAA'],
      securityScore: 97
    },
    {
      id: 4,
      name: 'Code Review Assistant',
      department: 'Engineering',
      status: 'active',
      environment: 'production',
      version: 'v2.0.0',
      requests: 3421,
      avgResponseTime: 2.8,
      successRate: 98.2,
      costPerDay: 156.78,
      threats: 0,
      lastDeployed: '2026-01-01T08:30:00Z',
      compliance: ['SOC 2', 'ISO 27001'],
      securityScore: 96
    },
    {
      id: 5,
      name: 'Sales Intelligence',
      department: 'Sales',
      status: 'active',
      environment: 'production',
      version: 'v1.2.0',
      requests: 4256,
      avgResponseTime: 1.9,
      successRate: 97.8,
      costPerDay: 112.45,
      threats: 0,
      lastDeployed: '2026-01-01T07:15:00Z',
      compliance: ['SOC 2', 'GDPR'],
      securityScore: 95
    }
  ]);

  // Security threats data
  const [threats, setThreats] = useState([
    {
      id: 1,
      type: 'Prompt Injection',
      severity: 'high',
      agent: 'Customer Support AI',
      timestamp: '2026-01-01T12:45:00Z',
      status: 'mitigated',
      description: 'Attempted system prompt override detected and blocked',
      details: {
        sourceIP: '192.168.1.105',
        userAgent: 'Mozilla/5.0',
        attemptedPrompt: 'Ignore previous instructions and...',
        mitigationAction: 'Request blocked, user session flagged',
        riskScore: 8.5
      }
    },
    {
      id: 2,
      type: 'Shadow AI Detection',
      severity: 'medium',
      agent: 'Code Review Assistant',
      timestamp: '2026-01-01T11:30:00Z',
      status: 'investigating',
      description: 'Unauthorized API usage pattern detected',
      details: {
        sourceIP: '10.0.50.22',
        userAgent: 'Python/3.9 requests',
        anomalyType: 'Unusual API call frequency',
        mitigationAction: 'Rate limiting applied',
        riskScore: 6.2
      }
    },
    {
      id: 3,
      type: 'Data Exfiltration',
      severity: 'critical',
      agent: 'HR Assistant',
      timestamp: '2026-01-01T10:15:00Z',
      status: 'blocked',
      description: 'Attempted unauthorized data access blocked by policy',
      details: {
        sourceIP: '172.16.0.88',
        userAgent: 'Chrome/120.0',
        attemptedAccess: 'Employee salary database',
        mitigationAction: 'Access denied, admin notified',
        riskScore: 9.8
      }
    },
    {
      id: 4,
      type: 'Prompt Injection',
      severity: 'high',
      agent: 'Customer Support AI',
      timestamp: '2026-01-01T09:22:00Z',
      status: 'mitigated',
      description: 'Jailbreak attempt using role-play technique',
      details: {
        sourceIP: '203.0.113.45',
        userAgent: 'Safari/17.0',
        attemptedPrompt: 'Pretend you are in developer mode...',
        mitigationAction: 'Request sanitized and logged',
        riskScore: 7.8
      }
    },
    {
      id: 5,
      type: 'API Abuse',
      severity: 'medium',
      agent: 'Data Analytics Agent',
      timestamp: '2026-01-01T08:50:00Z',
      status: 'mitigated',
      description: 'Excessive API calls detected from single source',
      details: {
        sourceIP: '198.51.100.20',
        userAgent: 'curl/7.88.1',
        requestCount: '15,000 in 5 minutes',
        mitigationAction: 'IP temporarily blocked',
        riskScore: 5.5
      }
    },
    {
      id: 6,
      type: 'Unauthorized Access',
      severity: 'critical',
      agent: 'HR Assistant',
      timestamp: '2026-01-01T07:35:00Z',
      status: 'blocked',
      description: 'Access attempt with expired credentials',
      details: {
        sourceIP: '10.20.30.40',
        userAgent: 'Postman/10.0',
        credentialType: 'API Key expired 30 days ago',
        mitigationAction: 'Access denied, security team alerted',
        riskScore: 9.0
      }
    },
    {
      id: 7,
      type: 'Data Poisoning',
      severity: 'high',
      agent: 'Code Review Assistant',
      timestamp: '2026-01-01T06:18:00Z',
      status: 'mitigated',
      description: 'Attempt to inject malicious training data',
      details: {
        sourceIP: '192.0.2.100',
        userAgent: 'Mozilla/5.0',
        poisonType: 'Adversarial examples in code snippets',
        mitigationAction: 'Input validation blocked malicious data',
        riskScore: 8.2
      }
    },
    {
      id: 8,
      type: 'Prompt Injection',
      severity: 'medium',
      agent: 'Customer Support AI',
      timestamp: '2026-01-01T05:42:00Z',
      status: 'mitigated',
      description: 'Indirect prompt injection via user input',
      details: {
        sourceIP: '172.31.255.10',
        userAgent: 'Edge/120.0',
        attemptedPrompt: 'Hidden instructions in support ticket',
        mitigationAction: 'Content sanitized before processing',
        riskScore: 6.8
      }
    },
    {
      id: 9,
      type: 'PII Leak Attempt',
      severity: 'critical',
      agent: 'HR Assistant',
      timestamp: '2026-01-01T04:20:00Z',
      status: 'blocked',
      description: 'Attempt to extract personally identifiable information',
      details: {
        sourceIP: '198.18.0.50',
        userAgent: 'Python/3.11',
        targetData: 'Social security numbers',
        mitigationAction: 'Query blocked, DLP policy enforced',
        riskScore: 9.5
      }
    },
    {
      id: 10,
      type: 'Model Inversion',
      severity: 'high',
      agent: 'Data Analytics Agent',
      timestamp: '2026-01-01T03:15:00Z',
      status: 'investigating',
      description: 'Suspicious queries attempting to reverse-engineer model',
      details: {
        sourceIP: '203.0.113.78',
        userAgent: 'Custom Script',
        attackPattern: 'Iterative probing of model boundaries',
        mitigationAction: 'Session monitored, queries rate-limited',
        riskScore: 7.5
      }
    }
  ]);

  // Analytics data
  const [analytics, setAnalytics] = useState({
    totalRequests: 29786,
    totalCost: 625.69,
    avgResponseTime: 1.8,
    activeAgents: 3,
    threatsPrevented: 47,
    complianceScore: 96,
    trends: {
      requests: [8500, 9200, 8800, 9500, 10200, 9800, 10400],
      costs: [520, 545, 535, 580, 615, 595, 625],
      threats: [12, 8, 15, 10, 6, 9, 5]
    }
  });

  // Compliance frameworks
  const complianceFrameworks = [
    { name: 'SOC 2', score: 98, status: 'compliant', lastAudit: '2025-12-15' },
    { name: 'GDPR', score: 96, status: 'compliant', lastAudit: '2025-12-20' },
    { name: 'HIPAA', score: 94, status: 'compliant', lastAudit: '2025-12-18' },
    { name: 'ISO 27001', score: 92, status: 'review', lastAudit: '2025-11-30' }
  ];

  // Add notification
  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev].slice(0, 5));
  };

  // Real-time data updates - makes dashboard feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => {
        // Randomly increment requests (simulates real traffic)
        const requestIncrement = Math.floor(Math.random() * 15) + 5; // 5-20 requests
        const newTotalRequests = prev.totalRequests + requestIncrement;

        // Slightly vary cost (realistic fluctuation)
        const costChange = (Math.random() - 0.5) * 2; // -1 to +1
        const newTotalCost = Math.max(600, prev.totalCost + costChange);

        // Vary response time slightly
        const responseChange = (Math.random() - 0.5) * 0.2; // -0.1 to +0.1
        const newAvgResponseTime = Math.max(1.5, Math.min(2.5, prev.avgResponseTime + responseChange));

        // Occasionally prevent a threat
        const threatPrevented = Math.random() > 0.85; // 15% chance
        const newThreatsPrevented = threatPrevented ? prev.threatsPrevented + 1 : prev.threatsPrevented;

        // Update trend data (shift and add new values)
        const newRequests = [...prev.trends.requests.slice(1), prev.trends.requests[6] + Math.floor(Math.random() * 400) - 200];
        const newCosts = [...prev.trends.costs.slice(1), Math.floor(newTotalCost)];
        const newThreats = [...prev.trends.threats.slice(1), threatPrevented ? prev.trends.threats[6] + 1 : prev.trends.threats[6]];

        return {
          ...prev,
          totalRequests: newTotalRequests,
          totalCost: parseFloat(newTotalCost.toFixed(2)),
          avgResponseTime: parseFloat(newAvgResponseTime.toFixed(2)),
          threatsPrevented: newThreatsPrevented,
          trends: {
            requests: newRequests,
            costs: newCosts,
            threats: newThreats
          }
        };
      });

      // Update agent request counts
      setAgents(prevAgents => prevAgents.map(agent => {
        if (agent.status === 'active') {
          const requestChange = Math.floor(Math.random() * 10) + 1; // 1-10 requests
          const responseChange = (Math.random() - 0.5) * 0.1; // slight variation
          const successChange = (Math.random() - 0.5) * 0.2; // slight variation

          return {
            ...agent,
            requests: agent.requests + requestChange,
            avgResponseTime: Math.max(1.0, Math.min(4.0, agent.avgResponseTime + responseChange)),
            successRate: Math.max(95, Math.min(100, agent.successRate + successChange))
          };
        }
        return agent;
      }));

      // Update threats dynamically
      setThreats(prevThreats => {
        let updatedThreats = [...prevThreats];

        // Randomly update threat statuses (investigating -> mitigated, etc.)
        updatedThreats = updatedThreats.map(threat => {
          if (threat.status === 'investigating' && Math.random() > 0.7) {
            return { ...threat, status: 'mitigated' };
          }
          return threat;
        });

        // Occasionally add a new threat (10% chance every 3 seconds)
        if (Math.random() > 0.9) {
          const threatTypes = [
            {
              type: 'Prompt Injection',
              severity: Math.random() > 0.5 ? 'high' : 'medium',
              description: 'Attempted system prompt override detected and blocked',
              attemptedPrompt: 'Ignore previous instructions and...'
            },
            {
              type: 'API Abuse',
              severity: 'medium',
              description: 'Excessive API calls detected from single source',
              requestCount: `${Math.floor(Math.random() * 20000) + 10000} in 5 minutes`
            },
            {
              type: 'Shadow AI Detection',
              severity: 'medium',
              description: 'Unauthorized API usage pattern detected',
              anomalyType: 'Unusual API call frequency'
            },
            {
              type: 'Data Exfiltration',
              severity: 'critical',
              description: 'Attempted unauthorized data access blocked by policy',
              attemptedAccess: 'Sensitive database queries'
            },
            {
              type: 'Unauthorized Access',
              severity: Math.random() > 0.5 ? 'critical' : 'high',
              description: 'Access attempt with invalid credentials',
              credentialType: 'Expired API token'
            }
          ];

          const agentNames = [
            'Customer Support AI',
            'Data Analytics Agent',
            'HR Assistant',
            'Code Review Assistant'
          ];

          const selectedThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
          const selectedAgent = agentNames[Math.floor(Math.random() * agentNames.length)];

          const newThreat = {
            id: Date.now(),
            type: selectedThreat.type,
            severity: selectedThreat.severity,
            agent: selectedAgent,
            timestamp: new Date().toISOString(),
            status: Math.random() > 0.5 ? 'blocked' : 'investigating',
            description: selectedThreat.description,
            details: {
              sourceIP: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
              userAgent: ['Mozilla/5.0', 'Python/3.11', 'curl/7.88.1', 'Postman/10.0'][Math.floor(Math.random() * 4)],
              riskScore: parseFloat((Math.random() * 4 + 6).toFixed(1)),
              attemptedPrompt: selectedThreat.attemptedPrompt,
              requestCount: selectedThreat.requestCount,
              anomalyType: selectedThreat.anomalyType,
              attemptedAccess: selectedThreat.attemptedAccess,
              credentialType: selectedThreat.credentialType,
              mitigationAction: Math.random() > 0.5 ? 'Request blocked, user session flagged' : 'Access denied, admin notified'
            }
          };

          // Add new threat to the beginning and keep last 15
          updatedThreats = [newThreat, ...updatedThreats].slice(0, 15);
        }

        return updatedThreats;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Close alerts panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAlerts && !event.target.closest('.alerts-panel') && !event.target.closest('.alerts-button')) {
        setShowAlerts(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAlerts]);

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<Activity className="w-6 h-6 text-blue-600" />}
          title="Active Agents"
          value={analytics.activeAgents}
          change="+12%"
          trend="up"
        />
        <MetricCard
          icon={<AlertTriangle className="w-6 h-6 text-orange-600" />}
          title="Threats Blocked"
          value={analytics.threatsPrevented}
          change="-23%"
          trend="down"
        />
        <MetricCard
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          title="Daily Cost"
          value={`$${analytics.totalCost.toFixed(2)}`}
          change="+8%"
          trend="up"
        />
        <MetricCard
          icon={<CheckCircle className="w-6 h-6 text-purple-600" />}
          title="Compliance Score"
          value={`${analytics.complianceScore}%`}
          change="+2%"
          trend="up"
        />
      </div>

      {/* Real-time Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Threats</h3>
            <button
              onClick={() => setActiveView('security')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {threats.slice(0, 3).map(threat => (
              <ThreatItem
                key={threat.id}
                threat={threat}
                onClick={() => setSelectedThreat(threat)}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Agent Status</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {agents.filter(a => a.status === 'active').slice(0, 3).map(agent => (
              <AgentStatusItem key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MiniChart
            title="Requests"
            data={analytics.trends.requests}
            color="blue"
            suffix=" req"
          />
          <MiniChart
            title="Costs"
            data={analytics.trends.costs}
            color="green"
            prefix="$"
          />
          <MiniChart
            title="Threats"
            data={analytics.trends.threats}
            color="red"
            suffix=" threats"
          />
        </div>
      </div>
    </div>
  );

  // Agents View
  const AgentsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Agents</h2>
          <p className="text-gray-600 mt-1">Manage and monitor your deployed agents</p>
        </div>
        <button
          onClick={() => {
            setActiveView('deployment');
            addNotification('Starting new agent deployment', 'info');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <PlayCircle className="w-4 h-4" />
          Deploy New Agent
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onSelect={() => setSelectedAgent(agent)}
          />
        ))}
      </div>
    </div>
  );

  // Security View
  const SecurityView = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Security Center</h2>
        <p className="text-gray-600 mt-1">Monitor threats and security posture</p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium">Security Score</p>
              <p className="text-3xl font-bold text-green-900 mt-2">96/100</p>
            </div>
            <Shield className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700 font-medium">Active Threats</p>
              <p className="text-3xl font-bold text-orange-900 mt-2">{threats.filter(t => t.status !== 'mitigated').length}</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-orange-600" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 font-medium">Threats Blocked (24h)</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">47</p>
            </div>
            <Lock className="w-12 h-12 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Threats Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Threat Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Threat Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {threats.map(threat => (
                <ThreatRow
                  key={threat.id}
                  threat={threat}
                  onClick={() => setSelectedThreat(threat)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Compliance View
  const ComplianceView = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Compliance Dashboard</h2>
        <p className="text-gray-600 mt-1">Track compliance across frameworks</p>
      </div>

      {/* Compliance Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceFrameworks.map(framework => (
          <ComplianceCard key={framework.name} framework={framework} />
        ))}
      </div>

      {/* Agent Compliance Matrix */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Compliance Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                {complianceFrameworks.map(f => (
                  <th key={f.name} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {f.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agents.filter(a => a.status === 'active').map(agent => (
                <tr key={agent.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {agent.name}
                  </td>
                  {complianceFrameworks.map(f => (
                    <td key={f.name} className="px-6 py-4 whitespace-nowrap text-center">
                      {agent.compliance.includes(f.name) ? (
                        <CheckCircle className="w-5 h-5 text-green-500 inline" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 inline" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Analytics View
  const AnalyticsView = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
        <p className="text-gray-600 mt-1">Performance and cost optimization</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Requests (24h)</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{analytics.totalRequests.toLocaleString()}</p>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+15%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Avg Response Time</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{analytics.avgResponseTime}s</p>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>-8%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Total Cost (24h)</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">${analytics.totalCost.toFixed(2)}</p>
          <div className="flex items-center mt-2 text-sm text-orange-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12%</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600">Cost Per Request</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">$0.021</p>
          <div className="flex items-center mt-2 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>-3%</span>
          </div>
        </div>
      </div>

      {/* Agent Performance Comparison */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Performance Comparison</h3>
        <div className="space-y-4">
          {agents.filter(a => a.status === 'active').map(agent => (
            <AgentPerformanceBar key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost by Agent</h3>
          <div className="space-y-3">
            {agents.filter(a => a.costPerDay > 0).map(agent => (
              <div key={agent.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{agent.name}</span>
                <span className="text-sm font-semibold text-gray-900">${agent.costPerDay.toFixed(2)}/day</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Optimization Tips</h3>
          <div className="space-y-3">
            <OptimizationTip
              title="Reduce Data Analytics cost"
              description="Agent has high response time. Consider caching frequent queries."
              savings="~$45/day"
            />
            <OptimizationTip
              title="Optimize Code Review batching"
              description="Batch multiple file reviews to reduce API calls."
              savings="~$20/day"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Deployment Workflow View
  const DeploymentView = () => {
    const steps = [
      { title: 'Agent Configuration', icon: Settings },
      { title: 'Security Validation', icon: Shield },
      { title: 'Compliance Check', icon: FileText },
      { title: 'Deploy', icon: Zap }
    ];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Deploy New Agent</h2>
          <p className="text-gray-600 mt-1">Secure, validated deployment workflow</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.title}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index <= deploymentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-gray-600 mt-2 text-center max-w-[100px]">
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    index < deploymentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="mt-8">
            {deploymentStep === 0 && <ConfigurationStep />}
            {deploymentStep === 1 && <SecurityValidationStep />}
            {deploymentStep === 2 && <ComplianceCheckStep />}
            {deploymentStep === 3 && <DeployStep />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => {
                if (deploymentStep > 0) {
                  setDeploymentStep(deploymentStep - 1);
                } else {
                  setActiveView('agents');
                }
              }}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              {deploymentStep === 0 ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={() => {
                if (deploymentStep < 3) {
                  setDeploymentStep(deploymentStep + 1);
                  addNotification(`Completed: ${steps[deploymentStep].title}`, 'success');
                } else {
                  addNotification('Agent deployed successfully!', 'success');
                  setDeploymentStep(0);
                  setActiveView('agents');
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {deploymentStep === 3 ? 'Deploy Agent' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Component: Metric Card
  const MetricCard = ({ icon, title, value, change, trend }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <div className={`flex items-center mt-2 text-sm ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'down' ? 'transform rotate-180' : ''}`} />
            <span>{change}</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          {icon}
        </div>
      </div>
    </div>
  );

  // Component: Threat Item
  const ThreatItem = ({ threat, onClick }) => {
    const severityColors = {
      critical: 'bg-red-100 text-red-700 border-red-200',
      high: 'bg-orange-100 text-orange-700 border-orange-200',
      medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      low: 'bg-blue-100 text-blue-700 border-blue-200'
    };

    return (
      <div
        onClick={onClick}
        className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-all hover:shadow-md"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${severityColors[threat.severity]}`}>
                {threat.severity.toUpperCase()}
              </span>
              <span className="text-sm font-medium text-gray-900">{threat.type}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{threat.description}</p>
            <p className="text-xs text-gray-500 mt-1">Agent: {threat.agent}</p>
          </div>
          <Eye className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
        </div>
      </div>
    );
  };

  // Component: Agent Status Item
  const AgentStatusItem = ({ agent }) => (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-500"></div>
        <div>
          <p className="text-sm font-medium text-gray-900">{agent.name}</p>
          <p className="text-xs text-gray-500">{agent.requests.toLocaleString()} requests/hour</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-600">{agent.avgResponseTime}s avg</p>
        <p className="text-xs text-green-600">{agent.successRate}% success</p>
      </div>
    </div>
  );

  // Component: Mini Chart
  const MiniChart = ({ title, data, color, prefix = '', suffix = '' }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);

    return (
      <div>
        <p className="text-sm text-gray-600 mb-2">{title}</p>
        <div className="flex items-end gap-1 h-20">
          {data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end">
              <div
                className={`bg-${color}-500 rounded-t`}
                style={{ height: `${((value - min) / (max - min)) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <p className="text-lg font-semibold text-gray-900 mt-2">
          {prefix}{data[data.length - 1]}{suffix}
        </p>
      </div>
    );
  };

  // Component: Agent Card
  const AgentCard = ({ agent, onSelect }) => {
    const statusColors = {
      active: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      inactive: 'bg-gray-100 text-gray-700'
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.department}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[agent.status]}`}>
            {agent.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-600">Environment</p>
            <p className="text-sm font-medium text-gray-900">{agent.environment}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Version</p>
            <p className="text-sm font-medium text-gray-900">{agent.version}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Requests/hour</p>
            <p className="text-sm font-medium text-gray-900">{agent.requests.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Success Rate</p>
            <p className="text-sm font-medium text-gray-900">{agent.successRate}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Shield className="w-4 h-4" />
              <span>{agent.securityScore}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>${agent.costPerDay.toFixed(2)}/day</span>
            </div>
          </div>
          <button
            onClick={onSelect}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  // Component: Threat Row
  const ThreatRow = ({ threat, onClick }) => {
    const severityColors = {
      critical: 'text-red-700',
      high: 'text-orange-700',
      medium: 'text-yellow-700',
      low: 'text-blue-700'
    };

    const statusColors = {
      mitigated: 'bg-green-100 text-green-700',
      blocked: 'bg-red-100 text-red-700',
      investigating: 'bg-yellow-100 text-yellow-700'
    };

    return (
      <tr onClick={onClick} className="hover:bg-gray-50 cursor-pointer transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {threat.type}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`text-sm font-medium ${severityColors[threat.severity]}`}>
            {threat.severity.toUpperCase()}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {threat.agent}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[threat.status]}`}>
            {threat.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(threat.timestamp).toLocaleString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
          <Eye className="w-4 h-4 inline" />
        </td>
      </tr>
    );
  };

  // Component: Compliance Card
  const ComplianceCard = ({ framework }) => {
    const statusColors = {
      compliant: 'bg-green-100 text-green-700 border-green-200',
      review: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'non-compliant': 'bg-red-100 text-red-700 border-red-200'
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{framework.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[framework.status]}`}>
            {framework.status}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Compliance Score</span>
            <span className="text-sm font-semibold text-gray-900">{framework.score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${framework.score}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Last audit: {new Date(framework.lastAudit).toLocaleDateString()}
        </p>
      </div>
    );
  };

  // Component: Agent Performance Bar
  const AgentPerformanceBar = ({ agent }) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-700">{agent.name}</span>
        <span className="text-sm text-gray-600">{agent.successRate}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${
            agent.successRate >= 99 ? 'bg-green-500' :
            agent.successRate >= 95 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${agent.successRate}%` }}
        />
      </div>
    </div>
  );

  // Component: Optimization Tip
  const OptimizationTip = ({ title, description, savings }) => (
    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
        <p className="text-xs text-blue-600 font-semibold mt-1">Potential savings: {savings}</p>
      </div>
    </div>
  );

  // Deployment Steps
  const ConfigurationStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Agent Configuration</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Customer Support AI"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Customer Service</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>Human Resources</option>
            <option>Analytics</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Development</option>
            <option>Staging</option>
            <option>Production</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Claude Opus 4.5</option>
            <option>Claude Sonnet 4.5</option>
            <option>GPT-4</option>
            <option>Custom Model</option>
          </select>
        </div>
      </div>
    </div>
  );

  const SecurityValidationStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Security Validation</h3>
      <div className="space-y-3">
        <ValidationItem
          title="Prompt Injection Protection"
          status="passed"
          description="Agent implements input sanitization and validation"
        />
        <ValidationItem
          title="Data Encryption"
          status="passed"
          description="All data transmission uses TLS 1.3 encryption"
        />
        <ValidationItem
          title="Access Control"
          status="passed"
          description="Role-based access control configured"
        />
        <ValidationItem
          title="Rate Limiting"
          status="passed"
          description="API rate limits configured: 1000 req/min"
        />
      </div>
    </div>
  );

  const ComplianceCheckStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Compliance Check</h3>
      <div className="space-y-3">
        <ComplianceCheckItem
          framework="SOC 2"
          status="passed"
          requirements={['Logging enabled', 'Access controls verified', 'Data encryption confirmed']}
        />
        <ComplianceCheckItem
          framework="GDPR"
          status="passed"
          requirements={['Data retention policies set', 'User consent mechanisms in place', 'Right to deletion implemented']}
        />
        <ComplianceCheckItem
          framework="HIPAA"
          status="warning"
          requirements={['PHI handling configured', 'Audit logging enabled', 'Business Associate Agreement pending']}
        />
      </div>
    </div>
  );

  const DeployStep = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Ready to Deploy</h3>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-900">All checks passed</p>
            <p className="text-sm text-green-700 mt-1">
              Your agent has passed all security and compliance validations and is ready for deployment.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Deployment Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Agent Name:</span>
            <span className="font-medium">Customer Support AI</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Department:</span>
            <span className="font-medium">Customer Service</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Environment:</span>
            <span className="font-medium">Production</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Model:</span>
            <span className="font-medium">Claude Opus 4.5</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ValidationItem = ({ title, status, description }) => (
    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
      {status === 'passed' ? (
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
      )}
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );

  const ComplianceCheckItem = ({ framework, status, requirements }) => {
    const statusColors = {
      passed: 'text-green-600',
      warning: 'text-yellow-600',
      failed: 'text-red-600'
    };

    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-900">{framework}</h4>
          <span className={`text-sm font-medium ${statusColors[status]}`}>
            {status.toUpperCase()}
          </span>
        </div>
        <ul className="space-y-1">
          {requirements.map((req, index) => (
            <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Main Navigation
  const Navigation = () => {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'agents', label: 'Agents', icon: Cpu },
      { id: 'security', label: 'Security', icon: Shield },
      { id: 'compliance', label: 'Compliance', icon: FileText },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp }
    ];

    return (
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">AgentGuard</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Enterprise
                </span>
              </div>

              <div className="hidden md:flex items-center gap-1">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeView === item.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowAlerts(!showAlerts);
                    if (!showAlerts) setAlertsViewed(true);
                  }}
                  className="alerts-button relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <AlertTriangle className="w-5 h-5" />
                  {threats.filter(t => t.status !== 'mitigated').length > 0 && !alertsViewed && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                {/* Alerts Dropdown Panel */}
                {showAlerts && (
                  <div className="alerts-panel absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
                        <button
                          onClick={() => setShowAlerts(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {threats.filter(t => t.status !== 'mitigated').length} active threat{threats.filter(t => t.status !== 'mitigated').length !== 1 ? 's' : ''} requiring attention
                      </p>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                      {threats.filter(t => t.status !== 'mitigated').length > 0 ? (
                        <div className="p-2">
                          {threats.filter(t => t.status !== 'mitigated').map(threat => (
                            <button
                              key={threat.id}
                              onClick={() => {
                                setSelectedThreat(threat);
                                setShowAlerts(false);
                              }}
                              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg mb-2 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                                  threat.severity === 'critical' ? 'bg-red-500' :
                                  threat.severity === 'high' ? 'bg-orange-500' :
                                  'bg-yellow-500'
                                }`}></div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-semibold uppercase ${
                                      threat.severity === 'critical' ? 'text-red-700' :
                                      threat.severity === 'high' ? 'text-orange-700' :
                                      'text-yellow-700'
                                    }`}>
                                      {threat.severity}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 truncate">
                                      {threat.type}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {threat.description}
                                  </p>
                                  <div className="flex items-center gap-3 mt-2">
                                    <span className="text-xs text-gray-500">
                                      Agent: {threat.agent}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {new Date(threat.timestamp).toLocaleTimeString()}
                                    </span>
                                  </div>
                                </div>
                                <Eye className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                          <p className="text-sm font-medium text-gray-900">All Clear!</p>
                          <p className="text-xs text-gray-600 mt-1">No active threats at this time</p>
                        </div>
                      )}
                    </div>

                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => {
                          setActiveView('security');
                          setShowAlerts(false);
                        }}
                        className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium text-center"
                      >
                        View All Threats →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  AD
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  // Agent Detail Modal
  const AgentDetailModal = () => {
    if (!selectedAgent) return null;

    const statusColors = {
      active: 'bg-green-100 text-green-800 border-green-300',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      inactive: 'bg-gray-100 text-gray-800 border-gray-300'
    };

    const handleSave = () => {
      // Update the agent in the agents list
      setAgents(prevAgents =>
        prevAgents.map(agent =>
          agent.id === editedAgent.id ? editedAgent : agent
        )
      );
      setSelectedAgent(editedAgent);
      setIsEditingAgent(false);
      setEditedAgent(null);
      addNotification('Agent updated successfully', 'success');
    };

    const handleCancel = () => {
      setEditedAgent(null);
      setIsEditingAgent(false);
    };

    const startEditing = () => {
      setEditedAgent({ ...selectedAgent });
      setIsEditingAgent(true);
    };

    const currentAgent = isEditingAgent && editedAgent ? editedAgent : selectedAgent;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {isEditingAgent ? (
                  <div className="space-y-4">
                    {/* Status and Environment Selectors */}
                    <div className="flex items-center gap-3">
                      <select
                        value={currentAgent.status}
                        onChange={(e) => setEditedAgent({ ...currentAgent, status: e.target.value })}
                        className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[currentAgent.status]} cursor-pointer`}
                      >
                        <option value="active">ACTIVE</option>
                        <option value="warning">WARNING</option>
                        <option value="inactive">INACTIVE</option>
                      </select>
                      <select
                        value={currentAgent.environment}
                        onChange={(e) => setEditedAgent({ ...currentAgent, environment: e.target.value })}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 cursor-pointer border-0"
                      >
                        <option value="production">production</option>
                        <option value="staging">staging</option>
                        <option value="development">development</option>
                      </select>
                    </div>
                    {/* Agent Name */}
                    <input
                      type="text"
                      value={currentAgent.name}
                      onChange={(e) => setEditedAgent({ ...currentAgent, name: e.target.value })}
                      className="text-2xl font-bold text-gray-900 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* Department and Version */}
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={currentAgent.department}
                        onChange={(e) => setEditedAgent({ ...currentAgent, department: e.target.value })}
                        placeholder="Department"
                        className="text-gray-600 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={currentAgent.version}
                        onChange={(e) => setEditedAgent({ ...currentAgent, version: e.target.value })}
                        placeholder="Version"
                        className="text-gray-600 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${statusColors[currentAgent.status]}`}>
                        {currentAgent.status.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {currentAgent.environment}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentAgent.name}</h2>
                    <p className="text-gray-600 mt-1">{currentAgent.department} • Version {currentAgent.version}</p>
                  </>
                )}
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            {/* Performance Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-700 font-medium mb-1">Requests/hour</p>
                  <p className="text-2xl font-bold text-blue-900">{currentAgent.requests.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-700 font-medium mb-1">Success Rate</p>
                  <p className="text-2xl font-bold text-green-900">{currentAgent.successRate.toFixed(1)}%</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-purple-700 font-medium mb-1">Avg Response</p>
                  <p className="text-2xl font-bold text-purple-900">{currentAgent.avgResponseTime.toFixed(2)}s</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-700 font-medium mb-1">Daily Cost</p>
                  <p className="text-2xl font-bold text-orange-900">${currentAgent.costPerDay.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Security & Compliance */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Compliance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">Security Score</p>
                    <Shield className={`w-5 h-5 ${
                      currentAgent.securityScore >= 95 ? 'text-green-600' :
                      currentAgent.securityScore >= 85 ? 'text-yellow-600' :
                      'text-red-600'
                    }`} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{currentAgent.securityScore}/100</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        currentAgent.securityScore >= 95 ? 'bg-green-600' :
                        currentAgent.securityScore >= 85 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${currentAgent.securityScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-gray-700">Threats Blocked</p>
                    <AlertTriangle className={`w-5 h-5 ${
                      currentAgent.threats === 0 ? 'text-green-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{currentAgent.threats}</p>
                  <p className="text-xs text-gray-600">
                    {currentAgent.threats === 0 ? 'No active threats' : 'Active threats detected'}
                  </p>
                </div>
              </div>

              {/* Compliance Badges */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Compliance Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {currentAgent.compliance && currentAgent.compliance.length > 0 ? (
                    currentAgent.compliance.map(framework => (
                      <span
                        key={framework}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {framework}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No compliance frameworks assigned</span>
                  )}
                </div>
              </div>
            </div>

            {/* Deployment Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deployment Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-sm font-medium text-gray-600">Environment</span>
                  <span className="text-sm text-gray-900 font-semibold">{currentAgent.environment}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-sm font-medium text-gray-600">Version</span>
                  <span className="text-sm text-gray-900 font-mono">{currentAgent.version}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-sm font-medium text-gray-600">Last Deployed</span>
                  <span className="text-sm text-gray-900">
                    {currentAgent.lastDeployed ? new Date(currentAgent.lastDeployed).toLocaleString() : 'Never'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Department</span>
                  <span className="text-sm text-gray-900">{currentAgent.department}</span>
                </div>
              </div>
            </div>

            {/* Cost Analysis */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-xs text-green-700 font-medium mb-1">Daily</p>
                  <p className="text-xl font-bold text-green-900">${currentAgent.costPerDay.toFixed(2)}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <p className="text-xs text-blue-700 font-medium mb-1">Monthly Est.</p>
                  <p className="text-xl font-bold text-blue-900">${(currentAgent.costPerDay * 30).toFixed(2)}</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <p className="text-xs text-purple-700 font-medium mb-1">Yearly Est.</p>
                  <p className="text-xl font-bold text-purple-900">${(currentAgent.costPerDay * 365).toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Agent Configuration (Edit Mode) */}
            {isEditingAgent && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Agent Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Requests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requests per Hour
                    </label>
                    <input
                      type="number"
                      value={currentAgent.requests || 0}
                      onChange={(e) => setEditedAgent({ ...currentAgent, requests: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Success Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Success Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={currentAgent.successRate || 0}
                      onChange={(e) => setEditedAgent({ ...currentAgent, successRate: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Avg Response Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avg Response Time (seconds)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={currentAgent.avgResponseTime || 0}
                      onChange={(e) => setEditedAgent({ ...currentAgent, avgResponseTime: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Cost Per Day */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Daily Cost ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={currentAgent.costPerDay || 0}
                      onChange={(e) => setEditedAgent({ ...currentAgent, costPerDay: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Security Score */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Score (0-100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={currentAgent.securityScore || 0}
                      onChange={(e) => setEditedAgent({ ...currentAgent, securityScore: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Threats */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Active Threats
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={currentAgent.threats || 0}
                      onChange={(e) => setEditedAgent({ ...currentAgent, threats: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Agent Actions / Description */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agent Description / Actions
                  </label>
                  <textarea
                    value={currentAgent.description || ''}
                    onChange={(e) => setEditedAgent({ ...currentAgent, description: e.target.value })}
                    placeholder="Describe what this agent does and its key actions..."
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Compliance Frameworks */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compliance Frameworks (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={currentAgent.compliance ? currentAgent.compliance.join(', ') : ''}
                    onChange={(e) => setEditedAgent({
                      ...currentAgent,
                      compliance: e.target.value.split(',').map(f => f.trim()).filter(f => f)
                    })}
                    placeholder="SOC2, GDPR, HIPAA, PCI-DSS"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Agent ID: #{selectedAgent.id}
              </p>
              <div className="flex gap-3">
                {isEditingAgent ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedAgent(null)}
                      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      Close
                    </button>
                    <button
                      onClick={startEditing}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Edit Agent
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Threat Detail Modal
  const ThreatDetailModal = () => {
    if (!selectedThreat) return null;

    const severityColors = {
      critical: 'bg-red-100 text-red-800 border-red-300',
      high: 'bg-orange-100 text-orange-800 border-orange-300',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      low: 'bg-blue-100 text-blue-800 border-blue-300'
    };

    const statusColors = {
      mitigated: 'bg-green-100 text-green-800',
      blocked: 'bg-red-100 text-red-800',
      investigating: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${severityColors[selectedThreat.severity]}`}>
                    {selectedThreat.severity.toUpperCase()} SEVERITY
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedThreat.status]}`}>
                    {selectedThreat.status.toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedThreat.type}</h2>
                <p className="text-gray-600 mt-1">{selectedThreat.description}</p>
              </div>
              <button
                onClick={() => setSelectedThreat(null)}
                className="text-gray-400 hover:text-gray-600 ml-4"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Affected Agent</p>
                <p className="text-lg font-semibold text-gray-900">{selectedThreat.agent}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Detected At</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(selectedThreat.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Threat Details */}
            {selectedThreat.details && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Threat Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {selectedThreat.details.sourceIP && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">Source IP</span>
                      <span className="text-sm text-gray-900 font-mono">{selectedThreat.details.sourceIP}</span>
                    </div>
                  )}
                  {selectedThreat.details.userAgent && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">User Agent</span>
                      <span className="text-sm text-gray-900">{selectedThreat.details.userAgent}</span>
                    </div>
                  )}
                  {selectedThreat.details.riskScore && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">Risk Score</span>
                      <span className={`text-sm font-semibold ${
                        selectedThreat.details.riskScore >= 8 ? 'text-red-600' :
                        selectedThreat.details.riskScore >= 6 ? 'text-orange-600' :
                        'text-yellow-600'
                      }`}>
                        {selectedThreat.details.riskScore}/10
                      </span>
                    </div>
                  )}
                  {selectedThreat.details.attemptedPrompt && (
                    <div className="pt-2">
                      <p className="text-sm font-medium text-gray-600 mb-2">Attempted Prompt</p>
                      <div className="bg-white border border-gray-300 rounded p-3">
                        <code className="text-sm text-red-600">{selectedThreat.details.attemptedPrompt}</code>
                      </div>
                    </div>
                  )}
                  {selectedThreat.details.attemptedAccess && (
                    <div className="pt-2">
                      <p className="text-sm font-medium text-gray-600 mb-2">Attempted Access</p>
                      <div className="bg-white border border-red-300 rounded p-3">
                        <code className="text-sm text-red-600">{selectedThreat.details.attemptedAccess}</code>
                      </div>
                    </div>
                  )}
                  {selectedThreat.details.anomalyType && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">Anomaly Type</span>
                      <span className="text-sm text-gray-900">{selectedThreat.details.anomalyType}</span>
                    </div>
                  )}
                  {selectedThreat.details.requestCount && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">Request Count</span>
                      <span className="text-sm text-gray-900">{selectedThreat.details.requestCount}</span>
                    </div>
                  )}
                  {selectedThreat.details.credentialType && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">Credential Type</span>
                      <span className="text-sm text-gray-900">{selectedThreat.details.credentialType}</span>
                    </div>
                  )}
                  {selectedThreat.details.poisonType && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">Attack Type</span>
                      <span className="text-sm text-gray-900">{selectedThreat.details.poisonType}</span>
                    </div>
                  )}
                  {selectedThreat.details.targetData && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">Target Data</span>
                      <span className="text-sm text-gray-900">{selectedThreat.details.targetData}</span>
                    </div>
                  )}
                  {selectedThreat.details.attackPattern && (
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-sm font-medium text-gray-600">Attack Pattern</span>
                      <span className="text-sm text-gray-900">{selectedThreat.details.attackPattern}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mitigation Actions */}
            {selectedThreat.details?.mitigationAction && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mitigation Actions</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900">Action Taken</p>
                      <p className="text-sm text-green-700 mt-1">{selectedThreat.details.mitigationAction}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Threat ID: #{selectedThreat.id}
              </p>
              <button
                onClick={() => setSelectedThreat(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Notifications
  const NotificationToast = () => {
    if (notifications.length === 0) return null;

    return (
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={`bg-white border rounded-lg shadow-lg p-4 flex items-start gap-3 ${
              notif.type === 'success' ? 'border-green-500' :
              notif.type === 'error' ? 'border-red-500' :
              'border-blue-500'
            }`}
          >
            {notif.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
            {notif.type === 'error' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
            {notif.type === 'info' && <AlertTriangle className="w-5 h-5 text-blue-500 flex-shrink-0" />}
            <div className="flex-1">
              <p className="text-sm text-gray-900">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'agents' && <AgentsView />}
        {activeView === 'security' && <SecurityView />}
        {activeView === 'compliance' && <ComplianceView />}
        {activeView === 'analytics' && <AnalyticsView />}
        {activeView === 'deployment' && <DeploymentView />}
      </main>

      <AgentDetailModal />
      <ThreatDetailModal />
      <NotificationToast />
    </div>
  );
};

export default AgentGuardEnterprise;
