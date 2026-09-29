import React, { useState, useEffect } from 'react';
import { 
  Play, RefreshCw, Cpu, HardDrive, ShieldAlert, ArrowRight, 
  CheckCircle, AlertCircle, Layers, Server, Activity, Terminal, 
  Sliders, FastForward, CheckCircle2, RotateCcw, Box, Radio
} from 'lucide-react';

interface Pod {
  id: string;
  name: string;
  status: 'Running' | 'Terminating' | 'ContainerCreating' | 'CrashLoopBackOff';
  ready: string;
  restarts: number;
  age: string;
  ip: string;
  node: string;
  version: 'v1.0.0' | 'v2.0.0';
  cpu: string;
  memory: string;
}

export const DevOpsSimulator: React.FC = () => {
  // Simulator State
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [version, setVersion] = useState<'v1.0.0' | 'v2.0.0'>('v1.0.0');
  const [targetReplicas, setTargetReplicas] = useState<number>(3);
  const [logs, setLogs] = useState<string[]>([
    'Initialized Kubernetes Controller Manager.',
    'Deployment markdown-editor synced with ReplicaSet markdown-editor-749bf (3 desired, 3 current).'
  ]);

  // Pods in Cluster
  const [pods, setPods] = useState<Pod[]>([
    {
      id: 'p1',
      name: 'markdown-editor-749bf-a1b2c',
      status: 'Running',
      ready: '1/1',
      restarts: 0,
      age: '42m',
      ip: '10.244.1.14',
      node: 'worker-node-1',
      version: 'v1.0.0',
      cpu: '24m',
      memory: '42Mi'
    },
    {
      id: 'p2',
      name: 'markdown-editor-749bf-d3e4f',
      status: 'Running',
      ready: '1/1',
      restarts: 0,
      age: '42m',
      ip: '10.244.2.18',
      node: 'worker-node-2',
      version: 'v1.0.0',
      cpu: '18m',
      memory: '39Mi'
    },
    {
      id: 'p3',
      name: 'markdown-editor-749bf-g5h6j',
      status: 'Running',
      ready: '1/1',
      restarts: 0,
      age: '42m',
      ip: '10.244.1.15',
      node: 'worker-node-1',
      version: 'v1.0.0',
      cpu: '31m',
      memory: '45Mi'
    }
  ]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev.slice(0, 40)]);
  };

  // Run End-to-End Pipeline simulation
  const runFullPipeline = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setActiveStage(1);
    addLog('DEVELOPER: Committed code changes to GitHub repository (branch: main).');

    // Stage 1: GitHub Webhook
    setTimeout(() => {
      setActiveStage(2);
      addLog('GITHUB: Triggered webhook HTTP POST -> http://jenkins:8080/github-webhook/');
    }, 1200);

    // Stage 2: Jenkins Checkout & Tests
    setTimeout(() => {
      setActiveStage(3);
      addLog('JENKINS: Running node tests/editor.test.js - 8/8 tests passed successfully.');
    }, 2500);

    // Stage 3: Docker Build & Push
    setTimeout(() => {
      setActiveStage(4);
      addLog('DOCKER: Built image user/markdown-live-editor:2.0.0 (Nginx Alpine ~23MB).');
      addLog('DOCKER HUB: Pushed image with SHA-256 digest to registry.');
    }, 3900);

    // Stage 4: Terraform & Ansible
    setTimeout(() => {
      setActiveStage(5);
      addLog('TERRAFORM: Verified AWS VPC & Security Groups state (0 to add, 0 to change).');
      addLog('ANSIBLE: Checked nodes health (ok=8, changed=0).');
    }, 5200);

    // Stage 5: Kubernetes Rolling Update
    setTimeout(() => {
      setActiveStage(6);
      addLog('KUBERNETES: Executing rolling update: kubectl set image deployment/markdown-editor v2.0.0');
      triggerRollingUpdate('v2.0.0');
    }, 6600);

    // Complete
    setTimeout(() => {
      setActiveStage(7);
      setPipelineRunning(false);
      addLog('SUCCESS: Pipeline finished! Application version 2.0.0 is live across all Pods with ZERO downtime.');
    }, 9000);
  };

  // Self-Healing Simulation: Kill a pod and watch K8s spawn a replacement
  const simulatePodFailure = (podId: string) => {
    const victim = pods.find(p => p.id === podId);
    if (!victim || victim.status !== 'Running') return;

    addLog(`SIMULATION: Killing Pod "${victim.name}" (simulating container crash or deletion)...`);
    
    // Set status to terminating
    setPods(prev => prev.map(p => p.id === podId ? { ...p, status: 'Terminating' } : p));

    // Remove dead pod after 1.2s and launch new replacement
    setTimeout(() => {
      const newHash = Math.random().toString(36).substring(2, 7);
      const newPod: Pod = {
        id: 'p-' + Date.now(),
        name: `markdown-editor-${victim.version === 'v2.0.0' ? '928ac' : '749bf'}-${newHash}`,
        status: 'ContainerCreating',
        ready: '0/1',
        restarts: 0,
        age: '1s',
        ip: `10.244.${Math.floor(Math.random() * 2) + 1}.${Math.floor(Math.random() * 200) + 10}`,
        node: victim.node,
        version: victim.version,
        cpu: '15m',
        memory: '35Mi'
      };

      setPods(prev => prev.filter(p => p.id !== podId).concat(newPod));
      addLog(`REPLICASET CONTROLLER: Detected drift! Desired: ${targetReplicas}, Current: ${pods.length - 1}.`);
      addLog(`KUBE-SCHEDULER: Scheduled new Pod "${newPod.name}" onto ${newPod.node}.`);

      // Pod becomes healthy running
      setTimeout(() => {
        setPods(prev => prev.map(p => p.id === newPod.id ? { ...p, status: 'Running', ready: '1/1' } : p));
        addLog(`KUBELET: Liveness & Readiness probe passed for "${newPod.name}" (/healthz returned 200). Self-healing complete!`);
      }, 1500);
    }, 1200);
  };

  // Rolling Update Simulation (v1.0.0 -> v2.0.0 or vice versa)
  const triggerRollingUpdate = (newVer: 'v1.0.0' | 'v2.0.0') => {
    setVersion(newVer);
    addLog(`ROLLING UPDATE: Initiating progressive rollout to ${newVer} (maxSurge: 1, maxUnavailable: 0)...`);

    // Step 1: Create 1 new v2 pod
    const hash1 = Math.random().toString(36).substring(2, 7);
    const newPod1: Pod = {
      id: 'p-roll-1',
      name: `markdown-editor-${newVer === 'v2.0.0' ? '928ac' : '749bf'}-${hash1}`,
      status: 'ContainerCreating',
      ready: '0/1',
      restarts: 0,
      age: '1s',
      ip: '10.244.1.29',
      node: 'worker-node-1',
      version: newVer,
      cpu: '20m',
      memory: '38Mi'
    };

    setPods(prev => [...prev, newPod1]);

    // Step 2: New pod becomes ready, 1 old pod terminates
    setTimeout(() => {
      setPods(prev => {
        const updated = prev.map(p => p.id === newPod1.id ? { ...p, status: 'Running' as const, ready: '1/1' } : p);
        const oldIndex = updated.findIndex(p => p.version !== newVer && p.status === 'Running');
        if (oldIndex !== -1) {
          updated[oldIndex] = { ...updated[oldIndex], status: 'Terminating' as const };
        }
        return updated;
      });
      addLog(`ROLLING UPDATE: New Pod ${newPod1.name} ready! Gracefully terminating 1 old Pod...`);
    }, 1500);

    // Step 3: Clean up terminated pod and replace remaining
    setTimeout(() => {
      setPods(prev => {
        const withoutDead = prev.filter(p => p.status !== 'Terminating');
        return withoutDead.map(p => ({
          ...p,
          version: newVer,
          name: p.name.replace(newVer === 'v2.0.0' ? '749bf' : '928ac', newVer === 'v2.0.0' ? '928ac' : '749bf')
        }));
      });
      addLog(`ROLLING UPDATE COMPLETE: All replicas running ${newVer}. Zero downtime achieved!`);
    }, 3200);
  };

  // Horizontal Pod Scaling (1 to 7 replicas)
  const handleScaleReplicas = (newCount: number) => {
    setTargetReplicas(newCount);
    addLog(`SCALE: Executing: kubectl scale deployment markdown-editor --replicas=${newCount} -n markdown-prod`);

    if (newCount > pods.length) {
      // Scale UP
      const diff = newCount - pods.length;
      const newPods: Pod[] = [];
      for (let i = 0; i < diff; i++) {
        const hash = Math.random().toString(36).substring(2, 7);
        newPods.push({
          id: 'p-scale-' + Math.random(),
          name: `markdown-editor-${version === 'v2.0.0' ? '928ac' : '749bf'}-${hash}`,
          status: 'Running',
          ready: '1/1',
          restarts: 0,
          age: '5s',
          ip: `10.244.${(i % 2) + 1}.${Math.floor(Math.random() * 150) + 20}`,
          node: (i % 2 === 0) ? 'worker-node-1' : 'worker-node-2',
          version: version,
          cpu: '18m',
          memory: '36Mi'
        });
      }
      setPods(prev => [...prev, ...newPods]);
      addLog(`KUBERNETES: Scaled UP! Created ${diff} additional Pods. Service load balancing active.`);
    } else if (newCount < pods.length) {
      // Scale DOWN
      const diff = pods.length - newCount;
      setPods(prev => prev.slice(0, newCount));
      addLog(`KUBERNETES: Scaled DOWN! Gracefully removed ${diff} Pods. Exactly ${newCount} pods active.`);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto p-4 md:p-6 space-y-6">
      {/* Title & Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-xl font-bold text-white">DevOps CI/CD & Kubernetes Cluster Simulator</h2>
          </div>
          <p className="text-xs text-slate-400">
            Interactive live demonstrator for your college review: test Pipeline execution, Pod self-healing, rolling updates, and horizontal scaling.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={runFullPipeline}
            disabled={pipelineRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs transition cursor-pointer shadow-md ${
              pipelineRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
            }`}
          >
            {pipelineRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{pipelineRunning ? 'Pipeline Running...' : 'Trigger CI/CD Pipeline'}</span>
          </button>

          <button
            onClick={() => triggerRollingUpdate(version === 'v1.0.0' ? 'v2.0.0' : 'v1.0.0')}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer"
            title="Demonstrate zero-downtime rolling update"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Rollout {version === 'v1.0.0' ? 'v2.0.0 (Green)' : 'v1.0.0 (Blue)'}</span>
          </button>
        </div>
      </div>

      {/* CI/CD Pipeline Visual Pipeline Bar */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>End-to-End Pipeline Stages</span>
          </h3>
          <span className="text-xs text-slate-400">
            Current Status: <strong className="text-emerald-400">{pipelineRunning ? 'In Progress' : 'Healthy & Deployed'}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: 1, name: '1. Git Push', desc: 'Windows PowerShell', icon: '💻' },
            { step: 2, name: '2. Webhook', desc: 'GitHub to Jenkins', icon: '🔗' },
            { step: 3, name: '3. Unit Tests', desc: 'Node.js Assertions', icon: '🧪' },
            { step: 4, name: '4. Docker Build', desc: 'Nginx Alpine Image', icon: '🐳' },
            { step: 5, name: '5. IaC & Config', desc: 'Terraform & Ansible', icon: '⚙️' },
            { step: 6, name: '6. K8s Deploy', desc: 'Rolling Update', icon: '☸️' },
          ].map((stage) => {
            const isCompleted = activeStage > stage.step || (!pipelineRunning && activeStage === 0);
            const isCurrent = activeStage === stage.step && pipelineRunning;

            return (
              <div
                key={stage.step}
                className={`p-3 rounded-lg border text-center transition-all ${
                  isCurrent
                    ? 'bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500 scale-[1.02]'
                    : isCompleted
                    ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="text-xl mb-1">{stage.icon}</div>
                <div className="font-semibold text-xs text-white">{stage.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{stage.desc}</div>
                <div className="mt-2 text-[10px] font-medium">
                  {isCurrent ? (
                    <span className="text-blue-400 animate-pulse flex items-center justify-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin inline" /> Running...
                    </span>
                  ) : isCompleted ? (
                    <span className="text-emerald-400 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 inline" /> Passed
                    </span>
                  ) : (
                    <span className="text-slate-500">Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cluster Controls: Scaling & Self-Healing Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scaling Widget */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-blue-400" />
                <span>Horizontal Pod Scaling</span>
              </span>
              <span className="bg-blue-950 border border-blue-800 text-blue-300 text-xs px-2 py-0.5 rounded font-mono">
                {pods.length} Replicas
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Drag slider to simulate <code className="text-slate-300">kubectl scale deployment</code>.
            </p>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min={1}
              max={6}
              value={pods.length}
              onChange={(e) => handleScaleReplicas(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 Pod</span>
              <span>3 (Default)</span>
              <span>6 Max</span>
            </div>
          </div>
        </div>

        {/* Self-Healing Widget Guide */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold text-amber-300">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Self-Healing Demonstration</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
            Click the <strong className="text-rose-400">"Kill Pod"</strong> button on any active Pod card below. Observe how the Kubernetes ReplicaSet controller detects the missing replica and recreates a new pod in 2 seconds!
          </p>
          <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[10px] font-mono text-slate-400">
            $ kubectl delete pod &lt;pod-name&gt; -n markdown-prod
          </div>
        </div>

        {/* Rolling Update & Version Status */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Release Deployment Strategy</span>
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
              version === 'v2.0.0' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-blue-950 text-blue-400 border border-blue-800'
            }`}>
              Image: {version}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
            Strategy: <strong className="text-slate-300">RollingUpdate</strong> (maxSurge: 1, maxUnavailable: 0).
          </p>
          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span>Ingress Route:</span>
            <code className="text-sky-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">http://markdown.local/</code>
          </div>
        </div>
      </div>

      {/* Kubernetes Pods Grid */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              <span>Kubernetes Active Pods (Namespace: <code className="text-slate-300 font-mono">markdown-prod</code>)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Service <code className="text-slate-300">markdown-editor-service</code> routes incoming traffic across these healthy pods.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {pods.filter(p => p.status === 'Running').length} / {pods.length} Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pods.map((pod) => (
            <div
              key={pod.id}
              className={`p-4 rounded-xl border transition-all ${
                pod.status === 'Running'
                  ? 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  : pod.status === 'Terminating'
                  ? 'bg-rose-950/30 border-rose-800/80 text-rose-200'
                  : 'bg-amber-950/30 border-amber-800/80 text-amber-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      pod.status === 'Running' ? 'bg-emerald-500' : pod.status === 'Terminating' ? 'bg-rose-500' : 'bg-amber-500 animate-ping'
                    }`}></span>
                    <span className="font-mono text-xs font-semibold text-white truncate" title={pod.name}>
                      {pod.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Node: {pod.node} • IP: {pod.ip}
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium ${
                  pod.version === 'v2.0.0' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-blue-900/60 text-blue-300'
                }`}>
                  {pod.version}
                </span>
              </div>

              {/* Specs & Health metrics */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 mb-3">
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-sky-400" />
                  <span>CPU: <strong>{pod.cpu}</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-indigo-400" />
                  <span>RAM: <strong>{pod.memory}</strong></span>
                </div>
                <div>Status: <strong className={pod.status === 'Running' ? 'text-emerald-400' : 'text-amber-400'}>{pod.status}</strong></div>
                <div>Ready: <strong>{pod.ready}</strong></div>
              </div>

              {/* Action Button: Simulate crash */}
              {pod.status === 'Running' ? (
                <button
                  onClick={() => simulatePodFailure(pod.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-medium transition cursor-pointer"
                  title="Simulate container crash to trigger Kubernetes Self-Healing"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Kill Pod (Self-Healing Demo)</span>
                </button>
              ) : (
                <div className="text-center py-1.5 text-xs font-mono text-slate-500 italic">
                  {pod.status === 'Terminating' ? 'Gracefully Terminating...' : 'Container Initializing (/healthz)...'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Terminal / Kubernetes Stream Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden font-mono text-xs shadow-lg">
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-200 font-semibold">Cluster Event Stream (kubectl watch)</span>
          </div>
          <button
            onClick={() => setLogs(['Cleared event logs.'])}
            className="text-[11px] hover:text-white transition cursor-pointer"
          >
            Clear Log
          </button>
        </div>
        <div className="p-4 h-44 overflow-y-auto space-y-1.5 text-slate-300 leading-relaxed">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-slate-600 select-none">&gt;</span>
              <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' : log.includes('SIMULATION') ? 'text-rose-400' : 'text-slate-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
