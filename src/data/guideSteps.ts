export interface GuideStep {
  phase: number;
  title: string;
  shortDescription: string;
  what: string;
  why: string;
  how: string;
  runIn: 'Windows PowerShell' | 'Jenkins Server' | 'Linux VM' | 'Kubernetes Terminal';
  command: string;
  expectedResult: string;
  howToVerify: string;
  commonError: string;
  fix: string;
}

export const GUIDE_PHASES: GuideStep[] = [
  {
    phase: 1,
    title: 'Phase 1: Application Setup & Verification',
    shortDescription: 'Verify and run the Markdown Live Editor files locally on your Windows machine.',
    what: 'We are verifying the Markdown Live Editor source files (HTML, CSS, JS) and running the application in the web browser.',
    why: 'Before automating anything with DevOps, we must first confirm that the core application runs without errors on our local development system.',
    how: 'Check the app directory and launch index.html using Windows PowerShell.',
    runIn: 'Windows PowerShell',
    command: `# Navigate to project folder and verify app files exist
Get-ChildItem -Path app

# Open the Markdown Live Editor in your default web browser
Start-Process "app/index.html"`,
    expectedResult: 'A browser window opens displaying the split-screen Markdown Live Editor with real-time preview, toolbar buttons, and document statistics.',
    howToVerify: 'Type "# Hello DevOps" in the left textarea. You should see "Hello DevOps" rendered as a large H1 heading in the right preview pane instantly.',
    commonError: '"Start-Process : Cannot find path because it does not exist."',
    fix: 'Make sure you are in the project root directory. Run "pwd" to check your current directory, and ensure the "app" folder contains "index.html".'
  },
  {
    phase: 2,
    title: 'Phase 2: Automated Unit Testing',
    shortDescription: 'Run the automated test suite to validate markdown parsing and XSS sanitization.',
    what: 'We are running automated Node.js unit tests against our Markdown parser and security filters.',
    why: 'Automated testing ensures that every code change adheres to quality standards before it can be built into a Docker container or deployed to Kubernetes.',
    how: 'Execute the test script using Node.js in Windows PowerShell.',
    runIn: 'Windows PowerShell',
    command: `# Run the unit tests
node tests/editor.test.js`,
    expectedResult: `RUNNING AUTOMATED UNIT TESTS: Markdown Live Editor
[PASS] Test 1: Should correctly convert # to <h1> tag
[PASS] Test 2: Should correctly convert ## to <h2> tag
[PASS] Test 3: Should convert **bold text** to <strong>
[PASS] Test 4: Should convert *italic text* to <em>
[PASS] Test 5: Should convert markdown links [text](url) to anchor tags
[PASS] Test 6: Should convert > blockquote to <blockquote>
[PASS] Test 7: Should gracefully return empty string for empty input
[PASS] Test 8: Should strip malicious <script> tags from rendered HTML
TEST SUMMARY: 8/8 Passed (100% SUCCESS)
STATUS: READY FOR DOCKER BUILD & DEPLOYMENT`,
    howToVerify: 'Check the exit code in PowerShell by running "$LASTEXITCODE". It must return "0" (success).',
    commonError: '"node : The term \'node\' is not recognized as the name of a cmdlet..."',
    fix: 'Install Node.js from https://nodejs.org/ (LTS version) and restart Windows PowerShell so the PATH variable updates.'
  },
  {
    phase: 3,
    title: 'Phase 3: Git Branching & GitHub Repository',
    shortDescription: 'Initialize Git, configure branching strategy, and push code to GitHub.',
    what: 'We are setting up Git version control, creating branches (main, develop, feature), and publishing the codebase to GitHub.',
    why: 'Git tracks changes, enables team collaboration without code loss, and allows Jenkins to automatically detect commits via webhooks.',
    how: 'Initialize git in PowerShell, set main as default branch, create feature branches, and push.',
    runIn: 'Windows PowerShell',
    command: `# 1. Initialize Git repository
git init

# 2. Configure your identity
git config user.name "Your Name"
git config user.email "your-email@example.com"

# 3. Add all files to staging and commit
git add .
git commit -m "feat: initial commit of markdown live editor and devops manifests"

# 4. Rename default branch to main
git branch -M main

# 5. Link to your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/your-username/markdown-live-editor.git

# 6. Push to GitHub
git push -u origin main

# 7. Create and switch to develop branch
git checkout -b develop
git push -u origin develop`,
    expectedResult: 'All files are securely uploaded to GitHub under branches "main" and "develop".',
    howToVerify: 'Open your GitHub repository in your browser. Verify all files (app/, tests/, Dockerfile, Jenkinsfile, kubernetes/, terraform/, ansible/) are visible.',
    commonError: '"fatal: remote origin already exists" or "Authentication failed for GitHub"',
    fix: 'For remote error, run "git remote set-url origin <new-url>". For authentication, generate a Personal Access Token (PAT) in GitHub Settings -> Developer Settings -> Tokens.'
  },
  {
    phase: 4,
    title: 'Phase 4: Docker Containerization',
    shortDescription: 'Build the lightweight Nginx Alpine container image and test it locally.',
    what: 'We are packaging our static Markdown editor inside a lightweight Nginx Alpine Docker image and running it as a container.',
    why: 'Docker eliminates the "it works on my machine" problem by bundling the web server, configuration, and app files into an immutable container.',
    how: 'Use the docker build command and run the container locally mapping port 8080 to 80.',
    runIn: 'Windows PowerShell',
    command: `# 1. Build the Docker image
docker build -t markdown-live-editor:1.0.0 .

# 2. View the newly created image and verify size (~23MB)
docker images | Select-String "markdown-live-editor"

# 3. Run the container locally in detached mode
docker run -d -p 8080:80 --name markdown-app markdown-live-editor:1.0.0

# 4. Verify running status and health check
docker ps --filter "name=markdown-app"

# 5. Test health endpoint from PowerShell
Invoke-RestMethod -Uri http://localhost:8080/healthz

# 6. Open in browser
Start-Process "http://localhost:8080"`,
    expectedResult: 'Docker builds the image successfully. The container runs on port 8080, and /healthz returns "healthy".',
    howToVerify: 'Run "docker ps". The container "markdown-app" shows STATUS "Up ... (healthy)". Opening http://localhost:8080 renders the editor.',
    commonError: '"docker: error during connect: This error may indicate that the docker daemon is not running."',
    fix: 'Open Docker Desktop on your Windows machine and wait until the whale icon in the taskbar turns solid green (Engine running).'
  },
  {
    phase: 5,
    title: 'Phase 5: Push Image to Docker Hub Registry',
    shortDescription: 'Tag the Docker image and push to your public Docker Hub repository.',
    what: 'We are logging into Docker Hub, tagging the local image with your username and build version, and uploading it.',
    why: 'Kubernetes needs a central registry to pull the container image when deploying Pods onto worker nodes.',
    how: 'Log in using docker login, tag the image, and run docker push.',
    runIn: 'Windows PowerShell',
    command: `# 1. Log in to Docker Hub (enter your Docker Hub username and password)
docker login

# 2. Tag your local image (replace your-dockerhub-username with your actual username)
docker tag markdown-live-editor:1.0.0 your-dockerhub-username/markdown-live-editor:1.0.0
docker tag markdown-live-editor:1.0.0 your-dockerhub-username/markdown-live-editor:latest

# 3. Push both tags to Docker Hub
docker push your-dockerhub-username/markdown-live-editor:1.0.0
docker push your-dockerhub-username/markdown-live-editor:latest`,
    expectedResult: 'Docker uploads all layers to Docker Hub and displays "1.0.0: digest: sha256:... size: ...".',
    howToVerify: 'Log in to https://hub.docker.com and verify your repository "your-dockerhub-username/markdown-live-editor" displays tags "1.0.0" and "latest".',
    commonError: '"denied: requested access to the resource is denied" or "unauthorized: authentication required"',
    fix: 'Run "docker login" again and ensure the repository prefix matches your exact Docker Hub username.'
  },
  {
    phase: 6,
    title: 'Phase 6: Jenkins CI/CD Pipeline Automation',
    shortDescription: 'Configure Jenkins credentials, create pipeline job, and connect GitHub webhook.',
    what: 'We are creating a Declarative Jenkins Pipeline that automates checkout, test, build, push, and Kubernetes deployment.',
    why: 'Continuous Integration and Continuous Deployment remove human manual steps and guarantee rapid, reliable releases.',
    how: 'Add credentials in Jenkins, create a Pipeline project pointing to the repository, and test the build.',
    runIn: 'Jenkins Server',
    command: `# In Jenkins Web UI (http://localhost:8080 or Jenkins server IP):
# 1. Go to: Manage Jenkins -> Credentials -> System -> Global credentials
#    Add "Username with password" credential:
#    - ID: docker-hub-username & docker-hub-password
# 2. Create "New Item" -> Enter "markdown-live-editor-pipeline" -> Select "Pipeline"
# 3. Under Pipeline definition:
#    - Select: "Pipeline script from SCM"
#    - SCM: Git
#    - Repository URL: https://github.com/your-username/markdown-live-editor.git
#    - Script Path: Jenkinsfile
# 4. Under Build Triggers:
#    - Check: "GitHub hook trigger for GITScm polling"
# 5. Click "Save" and click "Build Now"`,
    expectedResult: 'Jenkins executes all 7 pipeline stages successfully with green checkmarks: Checkout -> Validation -> Unit Tests -> Docker Build -> Docker Push -> K8s Deploy -> Verification.',
    howToVerify: 'View the Stage View dashboard in Jenkins. All boxes are bright green, and the console log concludes with "PIPELINE STATUS: SUCCESS!".',
    commonError: '"docker: permission denied while trying to connect to the Docker daemon socket"',
    fix: 'On the Linux Jenkins server, add the jenkins user to the docker group: "sudo usermod -aG docker jenkins && sudo systemctl restart jenkins".'
  },
  {
    phase: 7,
    title: 'Phase 7: Terraform Infrastructure Provisioning',
    shortDescription: 'Provision VPC, subnets, route tables, and security groups declaratively.',
    what: 'We are using Terraform to declare the cloud networking and security groups required by our deployment.',
    why: 'Infrastructure as Code provides repeatable, version-controlled cloud provisioning, avoiding error-prone manual cloud console clicking.',
    how: 'Initialize Terraform, review execution plan, and apply.',
    runIn: 'Windows PowerShell',
    command: `# 1. Navigate to the terraform directory
cd terraform

# 2. Initialize provider plugins
terraform init

# 3. Validate syntax of all .tf files
terraform validate

# 4. Preview resources that will be provisioned
terraform plan

# 5. Provision the infrastructure (WARNS before real creation)
# terraform apply -auto-approve

# 6. When college demonstration is complete, destroy resources to avoid costs:
# terraform destroy -auto-approve`,
    expectedResult: 'Terraform outputs "Apply complete! Resources: 7 added, 0 changed, 0 destroyed." with VPC and Security Group IDs.',
    howToVerify: 'Run "terraform show" to inspect active state, or verify the created VPC in the AWS Management Console.',
    commonError: '"No valid credential sources found" or "AccessDenied"',
    fix: 'Configure AWS credentials by running "aws configure" and entering your AWS Access Key ID, Secret Access Key, and default region (us-east-1).'
  },
  {
    phase: 8,
    title: 'Phase 8: Ansible Configuration Management',
    shortDescription: 'Configure target servers idempotently with Docker, tools, and Kubernetes prerequisites.',
    what: 'We are executing an Ansible playbook that connects via SSH to target servers to install Docker, disable swap, and configure packages.',
    why: 'Ansible guarantees that all server nodes in our cluster are configured identically and securely without manual SSH commands.',
    how: 'Run the ansible-playbook command against our inventory.',
    runIn: 'Linux VM',
    command: `# Navigate to ansible folder
cd ansible

# 1. Test SSH connectivity to all servers in inventory
ansible all -i inventory.ini.example -m ping

# 2. Run the master configuration playbook
ansible-playbook -i inventory.ini.example site.yml`,
    expectedResult: 'Ansible executes all tasks, displaying "PLAY RECAP: master-node : ok=8 changed=4 unreachable=0 failed=0".',
    howToVerify: 'SSH into the worker node and run "docker --version" and "kubelet --version" to confirm both are installed.',
    commonError: '"UNREACHABLE! => Failed to connect to the host via ssh: Permission denied (publickey)"',
    fix: 'Verify your SSH private key path in inventory.ini. Ensure your key has correct permissions: "chmod 600 ~/.ssh/id_rsa".'
  },
  {
    phase: 9,
    title: 'Phase 9: Kubernetes Deployment & Ingress Routing',
    shortDescription: 'Deploy 3 Pod replicas, Service, and Ingress to the Kubernetes cluster.',
    what: 'We are applying Kubernetes manifests to deploy our application across 3 Pods with a Service and Ingress controller.',
    why: 'Kubernetes ensures high availability, automatic load balancing, and health checking.',
    how: 'Apply manifests using kubectl in your terminal.',
    runIn: 'Kubernetes Terminal',
    command: `# 1. Create dedicated isolated namespace
kubectl apply -f kubernetes/namespace.yaml

# 2. Apply ConfigMap and Service
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/service.yaml
kubectl apply -f kubernetes/ingress.yaml

# 3. Apply the 3-replica Deployment
kubectl apply -f kubernetes/deployment.yaml

# 4. Verify Pod status
kubectl get pods -n markdown-prod -o wide

# 5. Check Service and endpoints
kubectl get svc -n markdown-prod
kubectl get endpoints -n markdown-prod`,
    expectedResult: 'All 3 Pods show STATUS "Running" with READY "1/1". The Service displays an assigned ClusterIP.',
    howToVerify: 'Run "kubectl describe deployment markdown-editor -n markdown-prod". Check that "Replicas: 3 desired | 3 updated | 3 total | 3 available".',
    commonError: '"ImagePullBackOff" or "ErrImagePull"',
    fix: 'Open "kubernetes/deployment.yaml", update the image line with your exact Docker Hub username/image:tag, and re-apply: "kubectl apply -f kubernetes/deployment.yaml".'
  },
  {
    phase: 10,
    title: 'Phase 10: Scaling, Self-Healing & Rolling Updates',
    shortDescription: 'Perform live demonstrations of horizontal scaling, self-healing, and zero-downtime updates.',
    what: 'We are testing the core DevOps capabilities: scaling to 5 replicas, simulating a pod crash, and rolling out an update.',
    why: 'These three demonstrations are the most critical evidence evaluated during a college final project viva.',
    how: 'Run kubectl scale, kubectl delete pod, and kubectl set image commands while observing output.',
    runIn: 'Kubernetes Terminal',
    command: `# --- DEMO 1: HORIZONTAL SCALING (Scale from 3 to 5 pods) ---
kubectl scale deployment markdown-editor --replicas=5 -n markdown-prod
kubectl get pods -n markdown-prod

# --- DEMO 2: SELF-HEALING (Simulate Pod failure) ---
# Copy any active pod name from the list above, then delete it:
kubectl delete pod markdown-editor-XXXXX -n markdown-prod
# Notice Kubernetes immediately starts a new pod to keep desired state:
kubectl get pods -n markdown-prod -w

# --- DEMO 3: ZERO-DOWNTIME ROLLING UPDATE (Version 2.0 release) ---
kubectl set image deployment/markdown-editor markdown-editor-container=username/markdown-live-editor:2.0.0 -n markdown-prod --record
kubectl rollout status deployment/markdown-editor -n markdown-prod

# --- DEMO 4: INSTANT ROLLBACK ---
kubectl rollout undo deployment/markdown-editor -n markdown-prod`,
    expectedResult: 'Pod scaling, self-healing, and rolling updates happen dynamically within seconds without dropping any incoming traffic.',
    howToVerify: 'Observe that at all times, the application responds with HTTP 200 and the website remains accessible to users.',
    commonError: 'Pod stays in "Terminating" or "CrashLoopBackOff"',
    fix: 'Inspect container logs using "kubectl logs <pod-name> -n markdown-prod" or run "kubectl describe pod <pod-name> -n markdown-prod" to see root cause events.'
  }
];
