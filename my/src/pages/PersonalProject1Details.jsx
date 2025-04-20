import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { media } from '../utils/mediaQueries';

const ProjectDetailContainer = styled(motion.div)`
  padding: 4rem 1rem;
  margin: 0 auto;
  max-width: 960px;
  color: var(--text-color);
  
  ${media.tablet} {
    padding: 3rem 1rem;
  }
  
  ${media.mobile} {
    padding: 2rem 0.8rem;
  }
`;

const ContentWrapper = styled(motion.div)``;

const ProjectHeader = styled(motion.header)`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--placeholder-bg);

  h2 { 
    font-size: 2.5em; 
    font-weight: 600; 
    color: var(--primary-color); 
    margin-bottom: 0.5rem; 
    
    ${media.tablet} {
      font-size: 2.2em;
    }
    
    ${media.mobile} {
      font-size: 1.8em;
    }
  }
  
  p { 
    font-size: 1.1em; 
    color: var(--secondary-text-color); 
    
    ${media.mobile} {
      font-size: 1em;
    }
  }
`;

const ProjectSection = styled(motion.section)`
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5em; 
    font-weight: 600; 
    color: var(--primary-color);
    margin-bottom: 1rem; 
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--placeholder-bg);
    
    ${media.mobile} {
      font-size: 1.3em;
    }
  }
  
  p { 
    margin-bottom: 1rem; 
    line-height: 1.6; 
  }
  
  ul { 
    list-style-position: inside; 
    padding-left: 1rem; 
    margin-bottom: 1rem; 
    
    ${media.mobile} {
      padding-left: 0.5rem;
    }
  }
  
  li { 
    margin-bottom: 0.5rem; 
  }
`;

const StyledLink = styled.a`
  color: var(--accent-color);
  text-decoration: underline;
  &:hover { opacity: 0.8; }
`;

const StyledInternalLink = styled(Link)`
  color: var(--accent-color);
  text-decoration: underline;
  font-weight: 500;
  &:hover { opacity: 0.8; }
`;

const ImageContainer = styled.div`
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  ${media.mobile} {
    margin: 1rem 0;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  display: block;
  margin-bottom: 0.5rem;
`;

const ImageCaption = styled.p`
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  text-align: center;
  margin-top: 0.5rem;
  
  ${media.mobile} {
    font-size: 0.8rem;
  }
`;

const CodeBlock = styled.pre`
  background-color: ${props => props.theme === 'dark' ? '#2d2d2d' : '#f5f5f5'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333'};
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  margin: 1rem 0;
`;

const SubSection = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  h4 {
    font-size: 1.2em;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 0.7rem;
    
    ${media.mobile} {
      font-size: 1.1em;
    }
  }
  
  ${media.mobile} {
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

export default function PersonalProject1Details() {
  return (
    <ProjectDetailContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ProjectHeader variants={itemVariants}>
          <h2>개인 프로젝트 1: 개인 서버 구축 상세 구현 과정</h2>
          <p>개인 개발 서버를 구축하고 운영하기 위해 진행했던 구체적인 과정과 적용 기술, 그리고 과정에서 겪었던 문제 및 해결 경험을 상세히 기술합니다. 이 프로젝트는 기존 리눅스 및 서버 관련 지식을 실제 환경에 적용하고 CLI 기반 운영 역량을 심화시키는 것을 목표로 진행되었습니다.</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>1. 서버 환경 구축 및 OS 설치</h3>
          
          <SubSection>
            <h4>환경 선택</h4>
            <p>클라우드 서비스 대신, 개인서버를 구축하는 방식을 선택했습니다.</p>
            <p><strong>선택 이유:</strong> 가상화 기술(Proxmox VE,etc)에 대한 실질적인 이해를 높이고,
             보유한 하드웨어 자원을 효율적으로 분할하여
             물리 서버 하드웨어에 Proxmox VE를 설치하여 서버환경을 유연하게 구성하기 위함이었습니다.</p>
          </SubSection>
          
          <ImageContainer>
            <ProjectImage src="/images/proxmox-dashboard.png" alt="Proxmox VE 대시보드" />
            <ImageCaption>그림 1: Proxmox VE 관리 대시보드와 가상 머신 목록</ImageCaption>
          </ImageContainer>
          
          <SubSection>
            <h4>Proxmox VE 설치 및 초기 설정</h4>
            <p>Proxmox VE를 Ryzen 5 5600g, 32GB RAM, 500GB Nvme  + 4TB sdd 구성의 서버에 설치하였었으나.
               ssd에 문제가 발생하여 현재는 500GB Nvme + 1TB sdd 구성의 서버로 임시로 변경하였습니다.
               설치 후 웹 인터페이스를 통해 네트워크 설정, 저장소(Storage) 설정 등 기본적인 초기 구성을 완료했습니다.</p>
          </SubSection>
          
          <SubSection>
            <h4>개발 서버 VM 생성 및 Debian 설치</h4>
            <p>Proxmox VE 내에 개발 서버 용도의 가상 머신(VM)을 생성하고, 운영체제로 Debian Linux를 설치했습니다.</p>
            <p><strong>Debian 선택 이유:</strong> 서버 운영체제로서의 높은 안정성, 폭넓은 패키지 지원, 그리고 CLI 환경에 대한 숙련도를 높이기에 적합하다고 판단했습니다.</p>
            <p>VM에는 6 CPU 코어, 16GB 메모리, 256GB의 디스크 공간을 할당했습니다. Debian 설치 후 SSH 서버를 설정하여 원격 접속 환경을 마련하고, 고정 IP 주소를 할당했으며, apt 패키지 매니저를 통해 시스템을 최신 상태로 업데이트했습니다. 모든 서버 관리는 CLI 환경을 중심으로 진행했습니다.</p>
          </SubSection>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>2. 핵심 서비스 구축: 개발 환경, 웹 서버(Caddy), 데이터베이스(MariaDB)</h3>
          <p><strong>목표:</strong> Node.js, Java, JavaScript 기반의 애플리케이션 개발 및 테스트를 위한 통합 환경과, 이를 외부에 서비스하기 위한 웹 서버 및 데이터베이스를 구축하는 것이었습니다.</p>
          
          <SubSection>
            <h4>2.1. 통합 개발 환경 (Node.js, Java, JavaScript)</h4>
            <ul>
              <li>apt 패키지 매니저를 사용하여 Node.js와 OpenJDK (Java Development Kit)를 설치했습니다.</li>
              <li>Node.js 프로젝트 관리를 위해 npm을, Java 프로젝트 빌드를 위해 Gradle을 설치하고 설정했습니다.</li>
              <li>로컬 개발 환경에서 사용하는 IntelliJ IDEA와 Visual Studio Code에서 SSH 원격 접속 기능을 활용하여 서버 자원을 직접 사용하며 개발 작업을 수행할 수 있도록 구성했습니다.</li>
            </ul>
          </SubSection>
          
          <ImageContainer>
            <ProjectImage src="/images/vscode-remote-ssh.png" alt="VS Code 원격 SSH 연결" />
            <ImageCaption>그림 2: Visual Studio Code를 사용한 SSH 원격 개발 환경</ImageCaption>
          </ImageContainer>
          
          <SubSection>
            <h4>2.2. 웹 서버 및 리버스 프록시 (Caddy)</h4>
            <p>웹 서버로는 Caddy를 선택했습니다.</p>
            <p><strong>Caddy 선택 이유:</strong> 설정 파일(Caddyfile)의 간결성, 자동 HTTPS 설정(Let's Encrypt 연동) 기능이 뛰어나 개인 서버 환경에 적합하다고 판단했습니다.</p>
            <p>Caddy를 설치하고, 개발 중인 애플리케이션(Node.js 또는 Java 기반)으로 요청을 전달하는 리버스 프록시 설정과 정적 파일 호스팅 설정을 구성했습니다.</p>
            
            <SyntaxHighlighter language="bash" style={vscDarkPlus}>
{`# 실제 운영 중인 Caddyfile 설정
caff.pw {
    # API 요청 처리를 위한 리버스 프록시 설정
    handle  /api/* {
        reverse_proxy 172.30.1.101:8080
    }

    # 정적 웹 사이트 파일 제공
    handle {
        root * /var/www/caff.pw
        try_files {path} {path}/ /index.html
        file_server
    }
    
    # 압축 설정으로 전송 데이터 최적화
    encode gzip zstd

    # 로그 설정
    log {
        output file /tmp/caddy.log
        format json
    }
}

# www 서브도메인에서 메인 도메인으로 리다이렉트
www.caff.pw {
    redir https://caff.pw{uri} permanent
}

# 포트폴리오 웹사이트 설정
capu.it.com {                  
    root * /var/www/capu.it.com
    try_files {path} {path}/ /index.html
    file_server
    encode gzip zstd 
}`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>2.3. 데이터베이스 (MariaDB)</h4>
            <ul>
              <li>관계형 데이터베이스로는 MariaDB를 설치했습니다.</li>
              <li>mysql_secure_installation 스크립트를 실행하여 루트 비밀번호 설정, 익명 사용자 제거, 원격 루트 로그인 비활성화 등 기본적인 보안 설정을 완료했습니다.</li>
              <li>애플리케이션에서 사용할 데이터베이스와 사용자 계정을 생성하고, 해당 계정에 필요한 권한을 부여했습니다.</li>
            </ul>
            
            <SyntaxHighlighter language="sql" style={vscDarkPlus}>
{`-- 데이터베이스 및 사용자 생성 SQL 예시
CREATE DATABASE myapp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'myapp_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON myapp_db.* TO 'myapp_user'@'localhost';
FLUSH PRIVILEGES;`}
            </SyntaxHighlighter>
          </SubSection>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>3. 서버 보안 강화 (UFW, Fail2ban)</h3>
          <p><strong>목표:</strong> 외부로부터 서버를 보호하고 비인가 접근 시도를 차단하여 서버의 안정성을 확보하는 것이었습니다.</p>
          
          <SubSection>
            <h4>방화벽 설정 (UFW)</h4>
            <p>UFW (Uncomplicated Firewall)를 사용하여 서버 접근 포트를 제어했습니다.</p>
            <p>기본 정책을 모든 인바운드 연결 거부(deny incoming)로 설정하고, SSH(포트 변경 2945), HTTP(80), HTTPS(443) 등 필수적인 서비스 포트만 명시적으로 허용하는 규칙을 추가했습니다
              <br/>
              <strong>참고:</strong> SSH등 연결은 로컬망 내부에서만(Local Only) 접속망 허용하고 vpn을 구축하여 보안을 강화하였습니다.
              </p>
            
            <SyntaxHighlighter language="bash" style={vscDarkPlus}>
{`# UFW 설정 예시
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 2945/tcp comment 'SSH on custom port'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw allow from 172.30.1.0/24 to any port 2945 proto tcp comment 'Allow SSH from local network'
sudo ufw enable`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>침입 시도 차단 (Fail2ban)</h4>
            <p>Fail2ban을 설치하고 설정하여 SSH 서비스에 대한 무차별 대입 공격(Brute-force attack) 시도를 모니터링하고, 일정 횟수 이상 실패 시 해당 IP를 자동으로 차단하도록 구성했습니다.</p>
            
            <SyntaxHighlighter language="ini" style={vscDarkPlus}>
{`# /etc/fail2ban/jail.local 설정 예시
[sshd]
enabled = true
port = 2945
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>기타 보안 설정</h4>
            <ul>
              <li>SSH 비밀번호 인증을 비활성화하고 키 기반 인증만 허용하도록 설정하여 보안을 강화했습니다.</li>
              <li>root 계정의 직접 로그인을 제한하고 일반 사용자로 로그인 후 sudo를 사용하도록 했습니다.</li>
              <li>apt를 통해 시스템 및 설치된 패키지를 정기적으로 업데이트하여 보안 취약점에 대응했습니다.</li>
            </ul>
            
            <SyntaxHighlighter language="bash" style={vscDarkPlus}>
{`# /etc/ssh/sshd_config 내 주요 보안 설정
Port 2945
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile %h/.ssh/authorized_keys`}
            </SyntaxHighlighter>
          </SubSection>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>4. 애플리케이션 배포 및 운영</h3>
          
          <SubSection>
            <h4>배포 방식</h4>
            <ul>
              <li>개발한 애플리케이션 소스 코드는 Git 저장소에 관리하고, 서버에서는 git clone 또는 git pull 명령어를 사용하여 최신 코드를 가져왔습니다.</li>
              <li>Node.js 애플리케이션은 PM2를 사용하여 프로세스를 관리하고 백그라운드 실행 및 자동 재시작을 설정했습니다.</li>
              <li>Java 애플리케이션 (예: <strong>Spring Boot 기반 JAR</strong>)은 빌드된 JAR 파일을 systemd 서비스로 등록하여 서버 부팅 시 자동 실행되고 관리되도록 구성했습니다.</li>
            </ul>
            
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
{`// pm2 설정 파일 (ecosystem.config.js) 예시
module.exports = {
  apps: [{
    name: "my-api",
    script: "server.js",
    instances: "max",
    exec_mode: "cluster",
    watch: false,
    env: {
      NODE_ENV: "production",
      PORT: 8080
    },
    env_development: {
      NODE_ENV: "development",
      PORT: 3000
    }
  }]
};`}
            </SyntaxHighlighter>
            
            <SyntaxHighlighter language="ini" style={vscDarkPlus}>
{`# Java 애플리케이션용 systemd 서비스 파일 (/etc/systemd/system/myapp.service)
[Unit]
Description=My Java Application
After=network.target

[Service]
User=myapp
WorkingDirectory=/opt/myapp
ExecStart=/usr/bin/java -jar myapp.jar
Restart=always

[Install]
WantedBy=multi-user.target`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>운영</h4>
            <p>서버 리소스 사용량(CPU, 메모리)은 htop 등의 도구로 모니터링했으며, 애플리케이션 및 시스템 로그를 주기적으로 확인하여 문제 발생 여부를 파악했습니다.</p>
          </SubSection>
          
          <ImageContainer>
            <ProjectImage src="/images/htop-monitoring.png" alt="htop을 이용한 서버 모니터링" />
            <ImageCaption>그림 4: htop을 이용한 서버 리소스 모니터링</ImageCaption>
          </ImageContainer>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>5. 문제 해결 및 학습 경험</h3>
          
          <SubSection>
            <h4>[문제 1]: 메인 SSD 저장 장치 장애로 인한 데이터 유실 및 백업의 결정적 중요성 체감</h4>
            <p><strong>상황:</strong> 프로젝트 진행 중, 서버의 메인 저장 장치로 사용하던 SSD에 예상치 못한 물리적 장애가 발생했습니다. 이로 인해 운영체제, 설정 파일, 데이터베이스 등 서버 내 모든 데이터와 설정이 유실되었습니다.</p>
            <p><strong>해결 과정:</strong> 당시 정기적인 백업 체계가 구축되어 있지 않아, 서버 환경 전체를 처음부터 다시 구축해야 했습니다. 이 과정에서 이전에 수동으로 진행했던 설정들을 자동화 스크립트 등으로 일부 개선하여 재구축 시간을 단축하려 노력했습니다.</p>
            <p><strong>배운 점:</strong> 이 경험은 데이터 및 시스템 설정의 정기적인 백업과 복구 전략 수립이 서버 운영에 있어 단순한 권장 사항이 아닌 가장 기본적인 필수 요소임을 뼈저리게 느끼게 했습니다. 이후 중요한 설정 파일과 데이터를 주기적으로 외부 저장소에 백업하는 스크립트를 작성하고 실행하는 체계를 마련했습니다.</p>
          </SubSection>
          
          <SubSection>
            <h4>[문제 2]: Caddyfile 설정 오류로 인한 웹 서비스 접근 문제</h4>
            <p><strong>상황:</strong> Caddyfile 설정 변경 후 웹 서비스에 접근이 불가능하거나 예상치 못한 응답이 발생하는 문제가 있었습니다.</p>
            <p><strong>해결 과정:</strong> Caddy 로그 파일(journalctl -u caddy)을 확인하여 구체적인 에러 메시지를 파악하고, Caddyfile 문법 검사(caddy fmt, caddy validate)를 통해 설정 오류 부분을 찾아 수정했습니다.</p>
            <p><strong>배운 점:</strong> 서비스 문제 발생 시 해당 서비스의 로그를 가장 먼저 확인하는 것이 문제 해결의 핵심임을 다시 한번 확인했습니다. 또한, 설정 파일 변경 후에는 반드시 문법 검사를 수행하는 습관의 중요성을 배웠습니다.</p>
          </SubSection>
          
          <SubSection>
            <h4>[문제 3]: 특정 Java 라이브러리 빌드 시 의존성 충돌</h4>
            <p><strong>상황:</strong> Java 애플리케이션 빌드(Gradle 사용) 중 특정 라이브러리 버전 간의 의존성 충돌로 인해 빌드가 실패하는 문제가 발생했습니다.</p>
            <p><strong>해결 과정:</strong> Gradle의 의존성 트리를 확인하여 충돌이 발생하는 라이브러리와 버전을 특정하고, configurations.all*.resolutionStrategy 설정을 통해 특정 라이브러리의 버전을 강제하거나 충돌을 해결하는 방법을 적용했습니다.</p>
            <p><strong>배운 점:</strong> 복잡한 프로젝트에서 의존성 관리가 얼마나 중요한지, 그리고 빌드 도구(Gradle)의 기능을 활용하여 의존성 문제를 해결하는 방법을 실질적으로 학습했습니다.</p>
          </SubSection>
          
          <SubSection>
            <h4>[문제 4]: 동일 출처 환경에서의 불필요한 백엔드 CORS 설정으로 인한 API 접근 문제</h4>
            <p>
              <strong>상황:</strong> Caddyfile 설정 및 웹 서버 로그에는 특별한 문제가 없었음에도 불구하고, 동일 도메인(`caff.pw`)에서 서비스되는 프론트엔드(React)에서 백엔드 API(Spring Boot, `/api/*` 경로)로의 요청이 정상적으로 처리되지 않는 문제가 발생했습니다. 동일 출처 환경이므로 CORS 제약이 없을 것으로 예상했기에 원인 파악에 혼란이 있었습니다.
            </p>
            <p>
              <strong>해결 과정:</strong> 웹 서버(Caddy) 설정과 로그를 재확인했으나 특이점을 찾지 못하여, 문제의 원인을 <strong>백엔드 애플리케이션(Spring Boot) 코드</strong>에서 찾기 시작했습니다. 코드 검토 결과, <strong>실제로는 필요하지 않은 CORS 관련 설정(예: 특정 컨트롤러나 전역 설정에 적용된 `@CrossOrigin` 어노테이션 또는 `WebMvcConfigurer`를 통한 CORS 설정)이 Spring Boot 애플리케이션 내에 포함되어 있는 것을 발견했습니다.</strong>
              <br/>
              프론트엔드와 백엔드가 동일한 출처(`caff.pw`)에서 서비스되므로 브라우저는 CORS 정책을 적용하지 않아 이 설정은 불필요했습니다. 오히려 이 설정이 내부적으로 요청 처리에 영향을 주었을 가능성을 의심했습니다. 해당 CORS 관련 설정을 <strong>Spring Boot 코드에서 제거</strong>하고 애플리케이션을 재배포(또는 재시작)하자, 프론트엔드에서의 API 호출이 정상적으로 동작하는 것을 확인했습니다.
            </p>
            <p>
              <strong>배운 점:</strong> 서비스 로그 확인과 설정 검증의 중요성 외에도, <strong>CORS 정책이 언제 필요하고 어디에 설정해야 하는지를 정확히 이해하는 것이 매우 중요함</strong>을 깨달았습니다. 특히 프론트엔드와 백엔드가 동일 출처에서 서비스될 때는 <strong>백엔드 애플리케이션 레벨에서의 CORS 설정이 불필요하며, 때로는 예기치 않은 문제를 유발할 수도 있음</strong>을 실감했습니다. CORS 설정은 명백히 다른 출처 간의 통신이 필요할 때 신중하게 적용해야 하며, 문제 발생 시 웹 서버 설정뿐만 아니라 <strong>애플리케이션 자체의 설정까지 면밀히 검토</strong>하는 다각적인 접근 방식이 필요함을 배웠습니다.
            </p>
            
            <SyntaxHighlighter language="java" style={vscDarkPlus}>
{`// Spring Boot에서 불필요하게 설정된 CORS 코드 예시 (문제의 원인)
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("https://caff.pw")  // 불필요: 동일 출처이므로 CORS가 적용되지 않음
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}

// 또는 컨트롤러 레벨의 @CrossOrigin 어노테이션 (불필요)
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "https://caff.pw")  // 불필요: 동일 출처이므로 CORS가 적용되지 않음
public class UserController {
    // ...
}`}
            </SyntaxHighlighter>
          </SubSection>
          
          <SubSection>
            <h4>전반적인 학습</h4>
            <p>이 외에도 다양한 패키지 설치 오류, 권한 문제, 네트워크 설정 미스 등을 겪으며 리눅스 CLI 환경에서의 트러블슈팅 능력과 문제 해결 능력을 크게 향상시킬 수 있었습니다.</p>
          </SubSection>
        </ProjectSection>

         <ProjectSection variants={itemVariants}>
          <h3>참고 자료 및 링크</h3>
          <ul>
            <li><StyledLink href="https://www.proxmox.com/en/proxmox-ve" target="_blank" rel="noopener noreferrer">Proxmox VE 공식 웹사이트</StyledLink></li>
            <li><StyledLink href="https://caddyserver.com/docs/" target="_blank" rel="noopener noreferrer">Caddy 웹 서버 문서</StyledLink></li>
            <li><StyledLink href="https://mariadb.org/" target="_blank" rel="noopener noreferrer">MariaDB 공식 웹사이트</StyledLink></li>
          </ul>
        </ProjectSection>

      </ContentWrapper>
    </ProjectDetailContainer>
  );
} 