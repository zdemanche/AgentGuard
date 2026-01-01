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
      status: 'warning',
      environment: 'staging',
      version: 'v2.0.0-beta',
      requests: 3421,
      avgResponseTime: 3.2,
      successRate: 96.8,
      costPerDay: 156.78,
      threats: 5,
      lastDeployed: '2025-12-29T16:45:00Z',
      compliance: ['SOC 2'],
      securityScore: 89
    },
    {
      id: 5,
      name: 'Sales Intelligence',
      department: 'Sales',
      status: 'inactive',
      environment: 'development',
      version: 'v1.0.0-alpha',
      requests: 0,
      avgResponseTime: 0,
      successRate: 0,
      costPerDay: 0,
      threats: 0,
      lastDeployed: null,
      compliance: [],
      securityScore: 0
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
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <AlertTriangle className="w-5 h-5" />
                {threats.filter(t => t.status !== 'mitigated').length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
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

      <ThreatDetailModal />
      <NotificationToast />
    </div>
  );
};

export default AgentGuardEnterprise;
