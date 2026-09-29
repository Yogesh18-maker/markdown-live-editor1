export interface VivaQuestion {
  id: string;
  category: '2-mark' | '5-mark' | '10-mark' | 'viva';
  topic: 'DevOps & CI/CD' | 'Docker' | 'Kubernetes' | 'Terraform' | 'Ansible' | 'Git & Jenkins' | 'Security';
  question: string;
  answer: string;
  keyPoints?: string[];
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  // ==========================================
  // 2-MARK QUESTIONS (15 QUESTIONS)
  // ==========================================
  {
    id: '2m-1',
    category: '2-mark',
    topic: 'DevOps & CI/CD',
    question: 'What is DevOps?',
    answer: 'DevOps is a set of practices, cultural philosophies, and tools that combines Software Development (Dev) and IT Operations (Ops) to shorten the systems development life cycle and deliver features, fixes, and updates rapidly with high quality.',
    keyPoints: ['Combines Dev + Ops', 'Automation across SDLC', 'Faster releases with high reliability']
  },
  {
    id: '2m-2',
    category: '2-mark',
    topic: 'DevOps & CI/CD',
    question: 'What is CI/CD?',
    answer: 'CI (Continuous Integration) is the practice of automatically integrating and testing code changes from multiple developers into a shared repository frequently. CD (Continuous Delivery/Deployment) automatically builds, packages, and releases tested code to staging or production environments.',
    keyPoints: ['CI = Automated test & build on commit', 'CD = Automated release to production']
  },
  {
    id: '2m-3',
    category: '2-mark',
    topic: 'Git & Jenkins',
    question: 'What is Git and why is it used?',
    answer: 'Git is a distributed version control system that tracks changes in source code during software development, enabling multiple developers to collaborate without overwriting each other\'s work and allowing easy rollback to previous commits.',
    keyPoints: ['Distributed version control', 'Tracks change history', 'Facilitates collaboration']
  },
  {
    id: '2m-4',
    category: '2-mark',
    topic: 'Git & Jenkins',
    question: 'What is a GitHub Webhook?',
    answer: 'A GitHub Webhook is an HTTP callback triggered by events (such as a code push or pull request) that automatically sends a payload to an external server like Jenkins to trigger a build pipeline immediately without polling.',
    keyPoints: ['Event-driven HTTP POST', 'Triggers Jenkins automatically', 'No manual polling required']
  },
  {
    id: '2m-5',
    category: '2-mark',
    topic: 'Docker',
    question: 'What is Docker and what is a container?',
    answer: 'Docker is a platform for developing, shipping, and running applications in isolated lightweight environments. A container is a runnable instance of a Docker image containing the application code, runtime, system tools, and libraries.',
    keyPoints: ['Container = Running instance of an image', 'Shares OS kernel', 'Lightweight & fast startup']
  },
  {
    id: '2m-6',
    category: '2-mark',
    topic: 'Docker',
    question: 'What is the difference between a Docker image and a container?',
    answer: 'A Docker image is a read-only blueprint/template containing application code, libraries, and instructions (like a class in OOP). A container is a live, running instance created from that image with a read-write layer (like an object in OOP).',
    keyPoints: ['Image = Static blueprint (Class)', 'Container = Running process (Object)']
  },
  {
    id: '2m-7',
    category: '2-mark',
    topic: 'Docker',
    question: 'What is the purpose of .dockerignore?',
    answer: '.dockerignore prevents unnecessary files (like .git, node_modules, secrets, local caches, and temporary files) from being copied into the Docker build context, resulting in faster build times and smaller, more secure container images.',
    keyPoints: ['Reduces build context size', 'Prevents accidental secret exposure', 'Speeds up image builds']
  },
  {
    id: '2m-8',
    category: '2-mark',
    topic: 'Terraform',
    question: 'What is Infrastructure as Code (IaC)?',
    answer: 'Infrastructure as Code (IaC) is the management and provisioning of computer data centers, networks, virtual machines, and cloud services through machine-readable definition files rather than manual physical hardware configuration or interactive configuration tools.',
    keyPoints: ['Defines infrastructure via code', 'Version controlled & repeatable', 'Prevents human configuration drift']
  },
  {
    id: '2m-9',
    category: '2-mark',
    topic: 'Terraform',
    question: 'What does the terraform.tfstate file do?',
    answer: 'The terraform.tfstate file maps the resources defined in your Terraform configuration files to real-world cloud resources. Terraform uses it to detect changes, plan modifications, and track resource dependencies.',
    keyPoints: ['Single source of truth for IaC', 'Maps code to real cloud IDs', 'Enables drift detection']
  },
  {
    id: '2m-10',
    category: '2-mark',
    topic: 'Ansible',
    question: 'What is Ansible and what is meant by idempotency?',
    answer: 'Ansible is an agentless automation tool for configuration management and application deployment. Idempotency means executing an Ansible playbook multiple times will only make changes if needed, leaving the system in the exact desired state without unwanted side effects.',
    keyPoints: ['Agentless (operates over SSH)', 'Idempotent: Safe to run repeatedly', 'YAML-based playbooks']
  },
  {
    id: '2m-11',
    category: '2-mark',
    topic: 'Kubernetes',
    question: 'What is Kubernetes (K8s)?',
    answer: 'Kubernetes is an open-source container orchestration platform designed to automate deploying, scaling, load balancing, health monitoring, and managing containerized applications across clusters of machines.',
    keyPoints: ['Container orchestration', 'Auto-scaling & self-healing', 'Declarative state management']
  },
  {
    id: '2m-12',
    category: '2-mark',
    topic: 'Kubernetes',
    question: 'What is a Pod in Kubernetes?',
    answer: 'A Pod is the smallest, most basic deployable unit in Kubernetes. It encapsulates one or more closely coupled containers that share storage resources, network IP address, and specifications for how to run.',
    keyPoints: ['Smallest atomic unit in K8s', 'Hosts one or more containers', 'Shares IP and volume storage']
  },
  {
    id: '2m-13',
    category: '2-mark',
    topic: 'Kubernetes',
    question: 'What is a Kubernetes Service?',
    answer: 'A Service is an abstraction that defines a logical set of Pods and a consistent policy to access them. Because Pods are ephemeral with dynamic IPs, a Service provides a stable IP address and DNS name with built-in load balancing.',
    keyPoints: ['Stable virtual IP and DNS', 'Internal load balancing', 'Decouples clients from dynamic Pod IPs']
  },
  {
    id: '2m-14',
    category: '2-mark',
    topic: 'Kubernetes',
    question: 'What is Kubernetes Ingress?',
    answer: 'Ingress is an API object that manages external HTTP/HTTPS access to services within a Kubernetes cluster. It provides URL routing, SSL/TLS termination, and name-based virtual hosting.',
    keyPoints: ['HTTP/HTTPS entry point to cluster', 'Path & host-based routing', 'SSL termination']
  },
  {
    id: '2m-15',
    category: '2-mark',
    topic: 'Kubernetes',
    question: 'What is the difference between a Liveness probe and a Readiness probe?',
    answer: 'A Liveness probe checks if the container is still running; if it fails, Kubernetes restarts the container. A Readiness probe checks if the container is ready to accept user network traffic; if it fails, the Pod is temporarily removed from Service load balancing.',
    keyPoints: ['Liveness: Restarts container if dead', 'Readiness: Stops routing traffic until ready']
  },

  // ==========================================
  // 5-MARK QUESTIONS (15 QUESTIONS)
  // ==========================================
  {
    id: '5m-1',
    category: '5-mark',
    topic: 'DevOps & CI/CD',
    question: 'Explain the complete end-to-end DevOps CI/CD pipeline flow implemented in this project.',
    answer: '1. Code Development: Developer writes Markdown Live Editor code and tests locally on Windows.\n2. Version Control: Changes are committed and pushed to GitHub branches (main/develop).\n3. Webhook Trigger: GitHub sends an automated POST event to Jenkins upon push.\n4. Jenkins Pipeline Execution: Checks out code, runs automated unit tests with Node.js, validates syntax, and builds the Docker image.\n5. Container Registry: Image is tagged with build number and pushed to Docker Hub.\n6. Infrastructure & Config: Terraform ensures cloud resources (VPC, nodes) are ready, while Ansible configures Docker and K8s prerequisites.\n7. Kubernetes Rolling Deployment: Jenkins updates the Deployment image tag in the "markdown-prod" namespace.\n8. Verification: Rollout status is verified. Ingress routes traffic to the 3 healthy Pod replicas with zero downtime.',
    keyPoints: ['Developer -> GitHub -> Jenkins -> Docker -> Docker Hub -> Kubernetes -> Ingress -> User']
  },
  {
    id: '5m-2',
    category: '5-mark',
    topic: 'Git & Jenkins',
    question: 'Explain the Git branching strategy (GitFlow) used in this project.',
    answer: 'We use a structured branching model to maintain production stability:\n- "main": Contains strictly production-ready code. Commits trigger automatic production deployments.\n- "develop": Acts as the integration branch where all tested features are aggregated before releasing to main.\n- "feature/*": Dedicated branches created off develop for individual tasks (e.g., feature/docker, feature/terraform). Once complete and tested, a Pull Request is opened to merge back into develop.\nBenefits: Isolated developer workflows, clean rollback points, and no broken code pushed directly to production.',
    keyPoints: ['main = Production', 'develop = Staging/Integration', 'feature/* = Isolated new work', 'Pull Requests for code review']
  },
  {
    id: '5m-3',
    category: '5-mark',
    topic: 'Docker',
    question: 'Explain the structure and optimization techniques used in our project Dockerfile.',
    answer: 'Key optimizations implemented:\n1. Base Image: Used "nginx:1.25-alpine", reducing base image size to ~23MB compared to standard Ubuntu/Node images (>500MB).\n2. Security: Copied static files to /usr/share/nginx/html with unprivileged nginx ownership (chmod 755).\n3. Custom Nginx Configuration: Includes Gzip compression for faster web delivery, custom security headers (X-Frame-Options, XSS protection), and a dedicated /healthz endpoint.\n4. Built-in HEALTHCHECK: Uses curl to poll /healthz every 30s to verify container responsiveness.\n5. .dockerignore: Excludes git history, node_modules, and terraform state to keep build context tiny.',
    keyPoints: ['Alpine Linux base (~23MB)', 'Security headers & non-root file ownership', 'Native Docker HEALTHCHECK', 'Gzip compression enabled']
  },
  {
    id: '5m-4',
    category: '5-mark',
    topic: 'Docker',
    question: 'What is the difference between Virtual Machines (VMs) and Docker Containers?',
    answer: '- Virtual Machines: Run a complete Guest Operating System on top of a Hypervisor (e.g., VMware, VirtualBox). High memory/CPU overhead, gigabytes in size, and takes minutes to boot.\n- Containers: Share the host machine\'s Linux OS kernel and isolate user space using cgroups and namespaces. Extremely lightweight (megabytes), boots in seconds, and utilizes system resources directly.\nWhy Containers for our Markdown Editor: Instant startup, consistent environment across Windows/Linux, and high density on Kubernetes nodes.',
    keyPoints: ['VM = Full Guest OS + Hypervisor (Heavy)', 'Container = Shared Host Kernel + Isolated Process (Light)', 'Containers start in milliseconds']
  },
  {
    id: '5m-5',
    category: '5-mark',
    topic: 'Git & Jenkins',
    question: 'Explain how Jenkins securely manages credentials in a CI/CD pipeline.',
    answer: 'Hardcoding secrets (like Docker Hub passwords, AWS keys, or SSH credentials) in a Jenkinsfile or GitHub repository is a major security risk. Jenkins solves this through its Credentials Store:\n1. Secrets are stored encrypted in the Jenkins master database.\n2. In the Jenkinsfile, credentials are bound using the "credentials(\'id\')" wrapper.\n3. Jenkins masks these secrets in console logs (displays as ****) so they are never leaked.\n4. Secrets are only injected as temporary environment variables during the specific build execution.',
    keyPoints: ['Stored encrypted in Jenkins vault', 'Masked in build logs (****)', 'Never committed to GitHub source code']
  },
  {
    id: '5m-6',
    category: '5-mark',
    topic: 'Terraform',
    question: 'Explain the core workflow of Terraform (init, plan, apply, destroy).',
    answer: '1. "terraform init": Initializes the working directory, downloads required provider plugins (e.g., AWS, Kubernetes), and configures the backend.\n2. "terraform plan": Performs a dry-run comparison between the desired state in .tf files and the existing state in terraform.tfstate, showing exactly what will be created (+), modified (~), or deleted (-).\n3. "terraform apply": Executes the planned changes against the cloud provider to provision real resources.\n4. "terraform destroy": Safely deletes all managed resources to prevent unexpected cloud costs.',
    keyPoints: ['init = Downloads plugins', 'plan = Previews changes', 'apply = Provisions infrastructure', 'destroy = Deletes resources']
  },
  {
    id: '5m-7',
    category: '5-mark',
    topic: 'Ansible',
    question: 'Explain the architecture and key components of Ansible.',
    answer: 'Ansible operates using a push-based, agentless architecture over SSH:\n1. Control Node: Machine where Ansible is installed and run (Linux/WSL).\n2. Managed Nodes: The target servers (e.g., K8s worker nodes) which require no special agent, only Python and SSH.\n3. Inventory File: Defines server IP addresses, host groups ([k8s_workers]), and connection details.\n4. Modules: Small discrete units of work (e.g., apt, service, user).\n5. Playbooks & Roles: YAML documents that declare tasks sequentially to configure nodes in an idempotent manner.',
    keyPoints: ['Agentless architecture over SSH', 'Inventory file groups servers', 'YAML playbooks with reusable roles']
  },
  {
    id: '5m-8',
    category: '5-mark',
    topic: 'Kubernetes',
    question: 'Explain how Kubernetes achieves Self-Healing in our deployment.',
    answer: 'Self-healing is managed by the Kubernetes Controller Manager:\n1. Desired State Definition: The deployment.yaml specifies "replicas: 3".\n2. Continuous Reconciliation: The ReplicaSet controller continuously monitors the cluster via the API server.\n3. Fault Detection: If a container process dies, fails its liveness probe (/healthz), or if a Pod is manually deleted (kubectl delete pod),\n4. Automatic Recovery: The controller detects that actual pods (2) < desired pods (3). It instantly schedules a new Pod on a healthy node, pulling the Docker Hub image and restoring the service to 3 healthy replicas within seconds without manual human intervention.',
    keyPoints: ['Controller compares Desired vs Actual state', 'Liveness probe detects crashed processes', 'ReplicaSet instantly replaces dead Pods']
  },
  {
    id: '5m-9',
    category: '5-mark',
    topic: 'Kubernetes',
    question: 'Explain the Kubernetes Rolling Update mechanism and how it ensures zero downtime.',
    answer: 'When a new version of the Markdown Editor image is released (v1.0 -> v2.0):\n1. Strategy Configuration: "strategy.type: RollingUpdate" with "maxSurge: 1" and "maxUnavailable: 0".\n2. Step 1: Kubernetes creates 1 new Pod with version 2.0 (total 4 pods).\n3. Step 2: Traffic is withheld from the new Pod until its Readiness probe passes (/healthz returns HTTP 200).\n4. Step 3: Once healthy, Kubernetes terminates 1 old Pod (total 3 pods).\n5. Step 4: The process repeats until all pods run version 2.0.\nZero Downtime: At no point is the service unavailable, and users never experience 502/503 errors.',
    keyPoints: ['maxSurge: Creates new pods first', 'maxUnavailable: 0 prevents capacity drop', 'Readiness probe validates before routing traffic']
  },
  {
    id: '5m-10',
    category: '5-mark',
    topic: 'Kubernetes',
    question: 'Explain why we use Resource Requests and Limits in our deployment manifest.',
    answer: 'Without resource constraints, a rogue or memory-leaking container can starve the entire host node:\n- "requests" (e.g., CPU 100m, Memory 64Mi): The minimum guaranteed resources required for Kubernetes to schedule the Pod onto a node.\n- "limits" (e.g., CPU 250m, Memory 128Mi): The maximum cap. If CPU exceeds the limit, the process is throttled. If memory exceeds the limit, the container is killed with an OOMKilled (Out of Memory) signal and restarted.\nThis guarantees Quality of Service (QoS) and fair resource sharing across the cluster.',
    keyPoints: ['Requests = Minimum guaranteed for scheduling', 'Limits = Maximum allowed threshold', 'Prevents node starvation and OOM crashes']
  },
  {
    id: '5m-11',
    category: '5-mark',
    topic: 'Kubernetes',
    question: 'What is the role of Kubernetes Ingress compared to a standard Service (ClusterIP / NodePort / LoadBalancer)?',
    answer: '- ClusterIP: Only accessible from inside the Kubernetes cluster.\n- NodePort: Opens a high port (30000-32767) on each node; unsuitable for production domain names.\n- LoadBalancer: Provisions an external cloud load balancer for each service (expensive if you have 10 services).\n- Ingress: A single entry point that manages multiple services under one external IP address. It performs HTTP host/path routing (e.g., markdown.example.com -> markdown-service:80), SSL/TLS termination, and centralized traffic management.',
    keyPoints: ['Single entry point for multiple services', 'Domain name and path-based routing', 'SSL/TLS termination at cluster boundary']
  },
  {
    id: '5m-12',
    category: '5-mark',
    topic: 'Security',
    question: 'Explain the security measures implemented in our Markdown Live Editor application and pipeline.',
    answer: '1. Application Level: DOMPurify sanitizes Markdown-rendered HTML, stripping malicious <script> tags and preventing Cross-Site Scripting (XSS).\n2. Container Level: Lightweight Alpine base, unprivileged Nginx ownership, read-only system permissions.\n3. CI/CD Level: Jenkins Credentials Store encrypts Docker Hub passwords; .gitignore prevents secret leakage.\n4. Kubernetes Level: Dedicated "markdown-prod" namespace isolation, securityContext non-root execution, resource limits to prevent DoS attacks.',
    keyPoints: ['XSS sanitization via DOMPurify', 'Encrypted credentials management', 'Namespace and container isolation', 'Resource bounds prevent DoS']
  },
  {
    id: '5m-13',
    category: '5-mark',
    topic: 'DevOps & CI/CD',
    question: 'How do you demonstrate horizontal scaling in Kubernetes for this application?',
    answer: 'Horizontal scaling increases or decreases the number of running Pods based on user demand:\n1. Imperative Scaling: Run "kubectl scale deployment markdown-editor --replicas=5 -n markdown-prod". Kubernetes immediately launches 2 additional pods, and the Service load balancer distributes incoming requests across all 5 pods.\n2. Declarative Scaling: Update "replicas: 5" in deployment.yaml and run "kubectl apply -f deployment.yaml".\n3. Autoscaling (HPA): The HorizontalPodAutoscaler monitors CPU utilization and scales pods automatically between 3 and 10 when CPU exceeds 70%.',
    keyPoints: ['Imperative: kubectl scale', 'Declarative: Update deployment.yaml', 'Automated: HorizontalPodAutoscaler (HPA)']
  },
  {
    id: '5m-14',
    category: '5-mark',
    topic: 'Git & Jenkins',
    question: 'What happens during the "Automated Unit Testing" stage in Jenkins?',
    answer: 'During the Jenkins test stage, "node tests/editor.test.js" is executed in an isolated runner:\n1. It verifies that Markdown headings (#, ##) compile to proper <h1>, <h2> tags.\n2. It verifies bold (**), italic (*), links, and blockquotes formatting.\n3. It verifies edge cases like null or empty string input.\n4. It performs an XSS injection test to verify that malicious scripts are filtered out.\nIf any test fails (exit code 1), the Jenkins pipeline immediately halts, marking the build RED and preventing broken code from building into a Docker image or deploying to Kubernetes.',
    keyPoints: ['Runs node tests/editor.test.js', 'Validates markdown syntax & XSS sanitization', 'Fails fast before container build']
  },
  {
    id: '5m-15',
    category: '5-mark',
    topic: 'Kubernetes',
    question: 'How do you roll back a failed deployment in Kubernetes?',
    answer: 'If a newly deployed version has a bug or fails health probes:\n1. View revision history: "kubectl rollout history deployment/markdown-editor -n markdown-prod".\n2. Trigger instant rollback: "kubectl rollout undo deployment/markdown-editor -n markdown-prod".\n3. Roll back to specific revision: "kubectl rollout undo deployment/markdown-editor --to-revision=1 -n markdown-prod".\nKubernetes executes a reverse rolling update, replacing broken pods with the previous healthy container image with zero downtime.',
    keyPoints: ['kubectl rollout history', 'kubectl rollout undo', 'Instant recovery with zero downtime']
  },

  // ==========================================
  // 10-MARK QUESTIONS (10 QUESTIONS)
  // ==========================================
  {
    id: '10m-1',
    category: '10-mark',
    topic: 'DevOps & CI/CD',
    question: 'Explain the complete architecture, workflow, and lifecycle of the Markdown Live Editor DevOps project from code commit to production delivery.',
    answer: 'INTRODUCTION:\nThe objective of this project is to build a production-grade, highly available Markdown Live Editor and deploy it using a modern automated DevOps pipeline.\n\nSYSTEM ARCHITECTURE PHASES:\n1. Source Code Management (Git & GitHub):\n   - Features are developed in isolated branches (feature/*).\n   - Merged into develop and finally main.\n   - GitHub repository is integrated with a webhook pointing to Jenkins.\n\n2. Continuous Integration (Jenkins CI):\n   - Webhook detects git push event and launches Declarative Jenkins Pipeline.\n   - Stage 1 (Checkout): Pulls latest commit.\n   - Stage 2 (Validation): Checks HTML/CSS/JS and validates Kubernetes YAML manifests.\n   - Stage 3 (Unit Tests): Runs Node.js test suite; validates syntax and XSS protection.\n   - Stage 4 (Docker Build): Creates lightweight Nginx Alpine container image.\n   - Stage 5 (Docker Push): Securely pushes tagged image (e.g. user/markdown-editor:BUILD_NUM) to Docker Hub using encrypted Jenkins credentials.\n\n3. Infrastructure as Code (Terraform) & Configuration (Ansible):\n   - Terraform provisions the AWS VPC, subnets, route tables, and security groups.\n   - Ansible runs idempotent playbooks to install Docker engine and Kubernetes tools.\n\n4. Continuous Deployment & Orchestration (Kubernetes):\n   - Namespace: markdown-prod ensures isolation.\n   - Deployment: Manages 3 replicas with RollingUpdate (maxSurge: 1, maxUnavailable: 0).\n   - Probes: Liveness and Readiness probes monitor /healthz.\n   - Service: ClusterIP load balances HTTP traffic across healthy pods.\n   - Ingress: Routes external domain traffic to Service port 80.\n\n5. Monitoring & Self-Healing:\n   - ReplicaSet ensures 3 pods are always running.\n   - If a pod crashes, Kubernetes replaces it automatically.\n   - Rolling update enables zero-downtime updates with instant rollback capability.',
    keyPoints: ['Full SDLC automation', 'Git -> Jenkins -> Docker -> Terraform -> Ansible -> K8s -> Ingress', 'Zero downtime & self-healing']
  },
  {
    id: '10m-2',
    category: '10-mark',
    topic: 'Kubernetes',
    question: 'Explain Kubernetes Pod lifecycle, ReplicaSet controller mechanics, and how Self-Healing and Rolling Updates are practically demonstrated.',
    answer: '1. KUBERNETES POD LIFECYCLE:\nA Pod moves through distinct phases: Pending (scheduled to node) -> ContainerCreating (pulling image) -> Running (at least one container active) -> Succeeded / Failed.\n\n2. REPLICASET CONTROLLER & SELF-HEALING:\n- The ReplicaSet controller continuously loops through the Reconciliation Cycle:\n  "Current State vs Desired State".\n- Demonstration:\n  Step 1: Check active pods: "kubectl get pods -n markdown-prod". (Shows 3 pods running)\n  Step 2: Kill one pod: "kubectl delete pod markdown-editor-xxxx -n markdown-prod".\n  Step 3: Watch real-time: "kubectl get pods -w -n markdown-prod".\n  Result: Kubernetes immediately notices only 2 pods exist, contacts kube-scheduler, and starts a new Pod within 2 seconds. The service never loses availability.\n\n3. ROLLING UPDATE MECHANICS:\n- Configured via "strategy: type: RollingUpdate" with "maxSurge: 1" and "maxUnavailable: 0".\n- When updating to image version 2.0:\n  a) Kubernetes spawns 1 new v2 pod.\n  b) Readiness probe executes GET /healthz every 5 seconds.\n  c) Once HTTP 200 is confirmed, traffic is directed to the new pod, and 1 old v1 pod is gracefully terminated.\n  d) This is repeated until all 3 pods are on v2.0.\n- Rollback: If v2.0 contains an error, running "kubectl rollout undo deployment/markdown-editor" reverts the rollout immediately.',
    keyPoints: ['Reconciliation Loop (Desired vs Actual)', 'Self-healing demo: delete pod & observe auto-recreation', 'Rolling update: maxSurge=1, maxUnavailable=0 for 0 downtime']
  },
  {
    id: '10m-3',
    category: '10-mark',
    topic: 'Terraform',
    question: 'Compare Infrastructure as Code (IaC) with Manual Provisioning, and explain how Terraform manages state, drift detection, and cloud resources.',
    answer: '1. MANUAL PROVISIONING vs IaC:\n- Manual: Slow, click-driven AWS console actions, error-prone, zero documentation, no version control, and hard to replicate across staging and prod.\n- IaC (Terraform): Declarative configuration files (.tf), version controlled in Git, repeatable across any environment in minutes, automated destruction to save cost.\n\n2. TERRAFORM ARCHITECTURE:\n- Providers: HashiCorp AWS and Kubernetes providers translate HCL into API calls.\n- State File (terraform.tfstate): Maps declared resources to actual cloud resource IDs (VPC ID, Subnet IDs).\n- Drift Detection: During "terraform plan", Terraform queries the cloud API and compares actual resources against the state file, identifying manual changes and planning corrections.\n\n3. CONFIGURATION IMPLEMENTATION IN THIS PROJECT:\n- "vpc_cidr = 10.0.0.0/16" creates an isolated virtual network.\n- Public subnets in two Availability Zones ensure high availability.\n- Internet Gateway and Route Tables allow inbound HTTP web traffic.\n- Security Group allows ports 80 (HTTP), 443 (HTTPS), 22 (SSH), and 30000-32767 (K8s NodePort).\n- Parameterized via variables.tf for environment independence.',
    keyPoints: ['Declarative vs Imperative', 'State file & Drift detection', 'Multi-AZ VPC, Subnets, and Security Groups']
  },
  {
    id: '10m-4',
    category: '10-mark',
    topic: 'Docker',
    question: 'Explain Docker containerization fundamentals, image layering, storage drivers, multi-stage builds, and container security best practices.',
    answer: '1. DOCKER FUNDAMENTALS & ARCHITECTURE:\nDocker uses a client-server architecture. The Docker Client talks via REST API to the Docker Daemon (dockerd), which manages images, containers, networks, and storage volumes.\n\n2. IMAGE LAYERS & UNION FILE SYSTEM:\nEvery instruction in a Dockerfile (FROM, RUN, COPY) creates a read-only immutable layer in the Union File System (Overlay2). When a container runs, Docker adds a thin read-write layer on top. Cached layers make subsequent builds fast.\n\n3. MULTI-STAGE & LIGHTWEIGHT BUILDS:\nIn our project, we chose "nginx:1.25-alpine":\n- Standard Ubuntu image: ~700MB, large attack surface.\n- Alpine Linux image: ~23MB total, minimal packages, virtually zero vulnerabilities.\n- Static assets are copied directly to /usr/share/nginx/html.\n\n4. CONTAINER SECURITY BEST PRACTICES:\n- Never store secrets or passwords in Dockerfile.\n- Run as non-root user when practical.\n- Use .dockerignore to keep unnecessary files out.\n- Implement native HEALTHCHECK directive.\n- Apply security headers in Nginx configuration.',
    keyPoints: ['Client-Daemon architecture', 'Immutable layers & Overlay2 caching', 'Alpine Linux reduces attack surface to ~23MB', 'HEALTHCHECK & security headers']
  },
  {
    id: '10m-5',
    category: '10-mark',
    topic: 'Git & Jenkins',
    question: 'Explain the anatomy of a Declarative Jenkins Pipeline (Jenkinsfile) and how each stage is designed for enterprise delivery.',
    answer: '1. DECLARATIVE PIPELINE STRUCTURE:\nA declarative pipeline enforces a clear, readable structure wrapped in "pipeline { ... }".\n\n2. ENVIRONMENT & CREDENTIALS BLOCK:\nConfigures Docker Hub credentials and Kubernetes kubeconfig securely via Jenkins credential IDs. No plain-text passwords.\n\n3. PIPELINE STAGES IN THIS PROJECT:\n- Stage 1: Checkout SCM (Fetches latest commit via Git).\n- Stage 2: Code Validation & Linting (Validates HTML/CSS/JS and K8s YAML manifests).\n- Stage 3: Automated Unit Testing (Executes Node.js test suite; fails pipeline if any test fails).\n- Stage 4: Docker Build (Compiles image tagged with BUILD_NUMBER and latest).\n- Stage 5: Docker Login & Push (Pushes image to Docker Hub container registry).\n- Stage 6: Deploy to Kubernetes (Executes "kubectl set image" performing zero-downtime rolling update).\n- Stage 7: Deployment Verification (Runs "kubectl rollout status" with timeout; verifies all pods are healthy).\n\n4. POST EXECUTION BLOCK:\n- success: Prints deployment confirmation and access URLs.\n- failure: Automatically executes "kubectl rollout undo" to restore the previous stable version!\n- always: Cleans up Docker credentials via "docker logout".',
    keyPoints: ['Strict Declarative syntax', 'Automated testing gate prevents bad builds', 'Automated rollback on failure in post-block']
  },
  {
    id: '10m-6',
    category: '10-mark',
    topic: 'Ansible',
    question: 'Explain Ansible architecture, inventory management, role structure, and write an idempotent task for server provisioning.',
    answer: '1. ANSIBLE ARCHITECTURE:\nAnsible uses an agentless architecture. It connects to target nodes via OpenSSH, executes Python modules remotely, and cleans up after execution.\n\n2. INVENTORY FILE:\nDefines target hosts grouped logically:\n[k8s_control_plane]\nmaster ansible_host=10.0.1.10\n[k8s_workers]\nworker1 ansible_host=10.0.1.11\nworker2 ansible_host=10.0.1.12\n\n3. IDEMPOTENT TASKS EXPLAINED:\nAn idempotent task checks the current system state before executing. If Docker is already installed and running, Ansible does nothing ("ok: 1"). If not installed, it installs it ("changed: 1"). Running it 100 times produces identical, predictable results.\n\n4. ROLE STRUCTURE:\nansible/\n  site.yml\n  roles/\n    docker/ (tasks/main.yml)\n    kubernetes/ (tasks/main.yml)\n    common/ (tasks/main.yml)\nSeparates concerns and makes tasks reusable across staging and production.',
    keyPoints: ['Agentless SSH communication', 'Logical host grouping in inventory', 'Idempotent state management', 'Modular role directory structure']
  },
  {
    id: '10m-7',
    category: '10-mark',
    topic: 'Kubernetes',
    question: 'Explain Kubernetes networking: Pod-to-Pod communication, ClusterIP Service, NodePort, and Ingress Controller routing.',
    answer: '1. KUBERNETES NETWORKING MODEL (IP-per-Pod):\nEvery Pod gets its own unique IP address within the cluster. Pods can communicate with all other Pods without NAT.\n\n2. WHY SERVICES ARE NEEDED:\nPods are ephemeral (they die and get replaced with new IPs). A Service provides a stable virtual IP and DNS name (markdown-editor-service.markdown-prod.svc.cluster.local). Kube-proxy configures iptables/IPVS rules to load balance traffic across Pod endpoints.\n\n3. SERVICE TYPES:\n- ClusterIP: Default type. Accessible only within the cluster.\n- NodePort: Exposes service on each node\'s static port (30000-32767).\n- LoadBalancer: Provisions cloud load balancer (e.g., AWS ALB).\n\n4. INGRESS CONTROLLER:\nInstead of costly individual LoadBalancers, an Ingress Controller (like Nginx Ingress) acts as a reverse proxy. It inspects incoming HTTP Host and Path headers and routes requests to the correct ClusterIP Service. In our project, requests to "markdown.local/" are seamlessly directed to markdown-editor-service on port 80.',
    keyPoints: ['IP-per-Pod networking model', 'kube-proxy and iptables load balancing', 'ClusterIP vs NodePort vs Ingress routing']
  },
  {
    id: '10m-8',
    category: '10-mark',
    topic: 'Security',
    question: 'Discuss end-to-end security in modern DevOps pipelines (DevSecOps) as implemented in this project.',
    answer: '1. SHIFT-LEFT SECURITY:\nSecurity is integrated from the earliest coding stage rather than checked after deployment.\n\n2. APPLICATION CODE SECURITY:\n- DOMPurify library sanitizes all user Markdown inputs.\n- Prevents Cross-Site Scripting (XSS) where an attacker attempts to inject malicious <script> tags or onerror attributes into rendered HTML.\n\n3. CONTAINER & IMAGE SECURITY:\n- Minimal Alpine base image eliminates unused utilities and known CVEs.\n- Static file permissions set to read-only for Nginx web server.\n- Container runs on standard unprivileged port 80.\n\n4. CI/CD & REPOSITORY SECURITY:\n- .gitignore excludes sensitive credentials (*.pem, *.tfstate, .env).\n- Jenkins Credentials Vault encrypts Docker Hub passwords and Kubeconfig.\n- No secrets are committed to GitHub.\n\n5. KUBERNETES RUNTIME SECURITY:\n- Namespace isolation ("markdown-prod").\n- Resource requests and limits prevent Denial of Service.\n- readOnlyRootFilesystem and allowPrivilegeEscalation: false in securityContext.',
    keyPoints: ['Shift-Left philosophy', 'XSS sanitization via DOMPurify', 'Alpine minimal attack surface', 'Encrypted secrets & RBAC']
  },
  {
    id: '10m-9',
    category: '10-mark',
    topic: 'DevOps & CI/CD',
    question: 'How do you demonstrate horizontal scaling, high availability, and load balancing during the college project review?',
    answer: 'STEP-BY-STEP REVIEW DEMONSTRATION PLAN:\n\n1. INITIAL STATE:\nRun "kubectl get pods -n markdown-prod -o wide".\nShow professor the 3 active Pods running on worker nodes with unique IPs.\n\n2. DEMONSTRATE LOAD BALANCING:\nAccess the application via browser or curl. Refresh multiple times. Inspect container logs via "kubectl logs -l app=markdown-editor --tail=10". Show that incoming requests are distributed evenly across all 3 Pod replicas by the Service.\n\n3. DEMONSTRATE HORIZONTAL SCALING:\nExecute: "kubectl scale deployment markdown-editor --replicas=6 -n markdown-prod".\nRun "kubectl get pods -n markdown-prod -w" in front of the reviewer.\nPoint out how 3 new Pods transition from ContainerCreating to Running in 2 seconds.\nExplain how the Service endpoint automatically includes the 3 new Pod IPs without restarting anything.\n\n4. DEMONSTRATE SCALE DOWN:\nExecute: "kubectl scale deployment markdown-editor --replicas=3 -n markdown-prod".\nWatch Kubernetes gracefully terminate 3 pods, maintaining exactly 3 healthy replicas.',
    keyPoints: ['Live cluster demonstration steps', 'Load balancing verification via logs', 'Real-time scaling 3 -> 6 -> 3 replicas']
  },
  {
    id: '10m-10',
    category: '10-mark',
    topic: 'DevOps & CI/CD',
    question: 'Discuss future enhancements, monitoring, and enterprise production upgrades for this project.',
    answer: '1. MONITORING & OBSERVABILITY:\n- Prometheus: Collect metrics (CPU, Memory, Request latency, HTTP 2xx/4xx/5xx error rates).\n- Grafana: Create visual dashboards displaying cluster health and pod metrics in real time.\n- Fluentd / ELK Stack: Centralized logging for container stdout/stderr.\n\n2. GITOOPS WITH ARGO CD:\n- Transition from Jenkins push-based deployment to GitOps pull-based deployment using ArgoCD.\n- The cluster automatically synchronizes state directly from a Git repository.\n\n3. SERVICE MESH (ISTIO):\n- Implement Istio for mTLS mutual encryption between pods, Canary deployments (10% traffic to v2, 90% to v1), and distributed tracing.\n\n4. CLUSTER AUTO-SCALER (KEDA):\n- Implement event-driven autoscaling based on real-time traffic spikes or queue depth.',
    keyPoints: ['Prometheus & Grafana observability', 'GitOps with ArgoCD', 'Service mesh with Istio', 'Event-driven autoscaling']
  },

  // ==========================================
  // VIVA / ORAL EXAM QUESTIONS (35 QUICK QUESTIONS)
  // ==========================================
  {
    id: 'viva-1',
    category: 'viva',
    topic: 'DevOps & CI/CD',
    question: 'What is the main goal of your project?',
    answer: 'To build a responsive real-time Markdown Live Editor and deploy it using a fully automated DevOps CI/CD pipeline featuring GitHub, Jenkins, Docker, Terraform, Ansible, and Kubernetes with high availability, rolling updates, and self-healing.'
  },
  {
    id: 'viva-2',
    category: 'viva',
    topic: 'Git & Jenkins',
    question: 'Why did you use GitHub?',
    answer: 'For distributed version control, tracking code revisions, implementing team branching strategies (main, develop, feature), and triggering automated CI/CD builds via webhooks.'
  },
  {
    id: 'viva-3',
    category: 'viva',
    topic: 'Git & Jenkins',
    question: 'Why did you use Jenkins?',
    answer: 'Jenkins is an industry-standard open-source automation server that orchestrates the entire CI/CD pipeline: testing code, building Docker images, pushing to registry, and updating Kubernetes.'
  },
  {
    id: 'viva-4',
    category: 'viva',
    topic: 'Docker',
    question: 'What is the base image used in your Dockerfile?',
    answer: 'We used "nginx:1.25-alpine". It is extremely lightweight (~23MB) and secure compared to standard Ubuntu or Debian images.'
  },
  {
    id: 'viva-5',
    category: 'viva',
    topic: 'Docker',
    question: 'Why did you choose Nginx to serve the app?',
    answer: 'The Markdown Live Editor is a client-side static web application (HTML, CSS, JS). Nginx is a high-performance web server optimized for serving static files with gzip compression and low memory footprint.'
  },
  {
    id: 'viva-6',
    category: 'viva',
    topic: 'Docker',
    question: 'What is a Docker Registry?',
    answer: 'A Docker Registry (such as Docker Hub) is a centralized storage and distribution system for named Docker images and version tags.'
  },
  {
    id: 'viva-7',
    category: 'viva',
    topic: 'Terraform',
    question: 'What is Terraform and why did you use it?',
    answer: 'Terraform is an open-source Infrastructure as Code (IaC) tool by HashiCorp. We use it to provision and manage cloud resources (VPC, subnets, security groups, nodes) declaratively.'
  },
  {
    id: 'viva-8',
    category: 'viva',
    topic: 'Ansible',
    question: 'Why did you use Ansible alongside Terraform?',
    answer: 'Terraform provisions the infrastructure (the virtual hardware/networking), while Ansible configures the software inside the servers (installing Docker, configuring system tools, setting up Kubernetes).'
  },
  {
    id: 'viva-9',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'Why did you use Kubernetes instead of running Docker containers directly?',
    answer: 'Standalone Docker does not provide multi-host orchestration, automatic scaling, rolling updates, self-healing, or centralized ingress routing across clusters. Kubernetes automates all of these.'
  },
  {
    id: 'viva-10',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'How many replicas are configured in your Kubernetes deployment?',
    answer: 'We configured 3 replicas to guarantee high availability. If one or two pods fail, the application remains accessible.'
  },
  {
    id: 'viva-11',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What is Self-Healing in Kubernetes?',
    answer: 'Self-healing is Kubernetes automatically restarting crashed containers or rescheduling new pods when existing pods fail or are deleted, maintaining the desired replica count.'
  },
  {
    id: 'viva-12',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'How do you prove self-healing in front of the examiner?',
    answer: 'Run "kubectl get pods", delete one pod using "kubectl delete pod <pod-name>", and immediately run "kubectl get pods". Kubernetes instantly spins up a new pod in seconds.'
  },
  {
    id: 'viva-13',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What is a Rolling Update?',
    answer: 'A deployment strategy where Kubernetes gradually updates Pod instances with new container versions one-by-one so the application remains available with zero downtime.'
  },
  {
    id: 'viva-14',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What do maxSurge and maxUnavailable mean?',
    answer: 'maxSurge is the maximum number of extra pods created above the desired count during an update (e.g. 1). maxUnavailable is the maximum number of pods that can be unavailable (set to 0 for zero downtime).'
  },
  {
    id: 'viva-15',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'How does Jenkins trigger a Kubernetes update?',
    answer: 'Jenkins executes "kubectl set image deployment/markdown-editor container=image:new_tag -n markdown-prod" via the Kubernetes CLI plugin.'
  },
  {
    id: 'viva-16',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What is a Kubernetes Namespace?',
    answer: 'A namespace provides a virtual cluster within a physical cluster, isolating resources, names, and access control (we use "markdown-prod").'
  },
  {
    id: 'viva-17',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What is a ConfigMap?',
    answer: 'A ConfigMap is an API object used to store non-confidential configuration data in key-value pairs (like app environment, theme, feature toggles) decoupled from container images.'
  },
  {
    id: 'viva-18',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What is the purpose of livenessProbe in deployment.yaml?',
    answer: 'It sends an HTTP GET request to /healthz every 10 seconds. If Nginx hangs or crashes and fails 3 times, Kubernetes automatically restarts the container.'
  },
  {
    id: 'viva-19',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What is the purpose of readinessProbe?',
    answer: 'It verifies that the container is fully initialized and ready to serve traffic before the Service begins routing user requests to it.'
  },
  {
    id: 'viva-20',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'How does a Kubernetes Service know which Pods belong to it?',
    answer: 'Through "labels" and "selectors". In our manifest, the Service specifies "selector: app: markdown-editor", routing traffic to all Pods with that matching label.'
  },
  {
    id: 'viva-21',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What is Ingress in Kubernetes?',
    answer: 'Ingress manages external HTTP/HTTPS routing to backend Services based on host names (e.g., markdown.local) and path rules.'
  },
  {
    id: 'viva-22',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'How do you scale the application up or down?',
    answer: 'Using "kubectl scale deployment markdown-editor --replicas=5 -n markdown-prod" or by updating the replicas field in the deployment YAML.'
  },
  {
    id: 'viva-23',
    category: 'viva',
    topic: 'Git & Jenkins',
    question: 'What are Jenkins Credentials?',
    answer: 'A secure storage mechanism in Jenkins that encrypts sensitive data like Docker Hub passwords and SSH keys, masking them in build logs.'
  },
  {
    id: 'viva-24',
    category: 'viva',
    topic: 'DevOps & CI/CD',
    question: 'What happens if a unit test fails in the Jenkins pipeline?',
    answer: 'The pipeline aborts immediately at Stage 3. It will not build the Docker image, will not push to Docker Hub, and will not deploy to Kubernetes, preventing bugs from reaching production.'
  },
  {
    id: 'viva-25',
    category: 'viva',
    topic: 'Docker',
    question: 'What is the difference between ADD and COPY in a Dockerfile?',
    answer: 'COPY copies local files from the build context into the container. ADD can also extract tar archives automatically and download files from remote URLs. Best practice is to use COPY for simplicity.'
  },
  {
    id: 'viva-26',
    category: 'viva',
    topic: 'Docker',
    question: 'What is the difference between CMD and ENTRYPOINT?',
    answer: 'ENTRYPOINT sets the default executable for the container, while CMD sets default arguments that can be overridden from the command line.'
  },
  {
    id: 'viva-27',
    category: 'viva',
    topic: 'Terraform',
    question: 'What happens when you run terraform destroy?',
    answer: 'Terraform reads the state file and terminates all cloud infrastructure created by that project to prevent incurring ongoing cloud billing costs.'
  },
  {
    id: 'viva-28',
    category: 'viva',
    topic: 'Ansible',
    question: 'Does Ansible require an agent to be installed on target nodes?',
    answer: 'No, Ansible is agentless. It connects to target machines using standard OpenSSH and executes Python scripts.'
  },
  {
    id: 'viva-29',
    category: 'viva',
    topic: 'Security',
    question: 'How does your application prevent Cross-Site Scripting (XSS)?',
    answer: 'We use the DOMPurify library in our JavaScript editor to sanitize user-entered Markdown before rendering it to the DOM, stripping malicious script tags and event handlers.'
  },
  {
    id: 'viva-30',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'How do you check the logs of a Pod in Kubernetes?',
    answer: 'Run "kubectl logs <pod-name> -n markdown-prod" or "kubectl logs -l app=markdown-editor --tail=50" to see streaming logs.'
  },
  {
    id: 'viva-31',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What command shows detailed troubleshooting info when a Pod fails to start?',
    answer: '"kubectl describe pod <pod-name> -n markdown-prod". It displays recent events, image pull errors, probe failures, and termination exit codes.'
  },
  {
    id: 'viva-32',
    category: 'viva',
    topic: 'Kubernetes',
    question: 'What is CrashLoopBackOff in Kubernetes?',
    answer: 'It is a state where a container continuously starts, crashes, and Kubernetes backs off exponentially before trying to restart it again. Caused by missing files, bad ports, or application crashes.'
  },
  {
    id: 'viva-33',
    category: 'viva',
    topic: 'DevOps & CI/CD',
    question: 'What is the difference between Continuous Delivery and Continuous Deployment?',
    answer: 'In Continuous Delivery, code changes are automatically tested and prepared for release, but deployment to production requires manual human approval. In Continuous Deployment, every change that passes all automated tests is automatically deployed to production without manual intervention.'
  },
  {
    id: 'viva-34',
    category: 'viva',
    topic: 'Git & Jenkins',
    question: 'How does Jenkins know when a commit happens on GitHub?',
    answer: 'Via a GitHub Webhook configured with the Jenkins URL (http://jenkins-server:8080/github-webhook/). Whenever a developer pushes code, GitHub immediately notifies Jenkins.'
  },
  {
    id: 'viva-35',
    category: 'viva',
    topic: 'DevOps & CI/CD',
    question: 'How would you summarize the business value of this DevOps project?',
    answer: 'It reduces deployment time from hours to seconds, eliminates human configuration error, provides 99.99% availability through Kubernetes self-healing and rolling updates, and reduces cloud costs through automated scaling.'
  }
];
