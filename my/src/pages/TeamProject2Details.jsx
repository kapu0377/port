import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { Link } from 'react-router-dom';
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import { media } from '../utils/mediaQueries';
import { PreviewBox, PreviewFrame } from '../styles/GlobalStyles';
import ClickableGif from '../components/ClickableGif';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import TranslatedSyntaxHighlighter from '../components/TranslatedSyntaxHighlighter';

TranslatedSyntaxHighlighter.registerLanguage('java', java);

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
  
  h4 {
    font-size: 1.3em;
    font-weight: 600;
    color: var(--primary-color);
    margin: 1.5rem 0 1rem;
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
  max-height: 500px;
  object-fit: contain;
  
  &[src$=".gif"] {
    max-height: 400px;
    object-fit: cover;
    margin: 0 auto;
  }
  
  ${media.tablet} {
    max-height: 400px;
    
    &[src$=".gif"] {
      max-height: 350px;
    }
  }
  
  ${media.mobile} {
    max-height: 300px;
    
    &[src$=".gif"] {
      max-height: 250px;
    }
  }
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

const StyledSlider = styled(Slider)`
  margin: 2rem 0;

  .slick-slide img {
    display: block;
    margin: 0 auto;
    max-height: 450px;
    object-fit: contain;
    border-radius: 4px;
  }

  .slick-dots li button:before {
    color: var(--primary-color);
    font-size: 10px;
    opacity: 0.5;
  }

  .slick-dots li.slick-active button:before {
    color: var(--accent-color);
    opacity: 1;
  }
  
  .slick-slide > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
  }
`;

const CarouselImageCaption = styled(ImageCaption)`
  margin-top: 0.8rem;
`;

const DemoButton = styled.button`
  display: block;
  margin: 2rem auto 1.5rem auto;
  background: linear-gradient(90deg, var(--accent-color) 0%, #6dd5ed 100%);
  color: #fff;
  font-size: 1.15em;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.12);
  padding: 0.9em 2.2em;
  letter-spacing: 0.02em;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover, &:focus {
    background: linear-gradient(90deg, #6dd5ed 0%, var(--accent-color) 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(52, 152, 219, 0.18);
    outline: none;
  }
`;

export default function TeamProject2Details() {
  const [showDemo, setShowDemo] = useState(false);
  const { t } = useTranslation();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    focusOnSelect: false,
  };

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
        <LanguageSwitcher />
        
        <ProjectHeader variants={itemVariants}>
          <h2>{t('project.title')}</h2>
          <p>{t('project.description')}</p>
        </ProjectHeader>

        <ProjectSection variants={itemVariants}>
          <h3>{t('project.architecture.title')}</h3>
          <p>{t('project.architecture.description')}</p>
          <ul>
            <li>
              <b>{t('project.architecture.layers.controller')}:</b> {t('project.architecture.layers.controller.description')}
            </li>
            <li>
              <b>{t('project.architecture.layers.service')}:</b> {t('project.architecture.layers.service.description')}
            </li>
            <li>
              <b>{t('project.architecture.layers.repository')}:</b> {t('project.architecture.layers.repository.description')}
            </li>
          </ul>
          <ImageCaption>{t('project.architecture.diagram')}</ImageCaption>
          <ImageContainer>
            <ProjectImage src="/images/architecture.png" alt="3-Tier Architecture" />
            <ImageCaption>{t('project.architecture.diagram.description')}</ImageCaption>
          </ImageContainer>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>{t('project.dataModeling.title')}</h3>
          <p>{t('project.dataModeling.description')}</p>
          <ul>
            <li>
              <ImageContainer>
                <ProjectImage src="/images/entity_overview.png" alt="주요 엔티티 및 관계 개요" />
                <ImageCaption>{t('project.dataModeling.entityOverview')}</ImageCaption>
              </ImageContainer>
            </li>
            <li>
              <b>{t('project.dataModeling.relationship')}:</b> <b>{t('project.dataModeling.oneToMany')}</b> {t('project.dataModeling.relationship.description')}
            </li>
            <li>
              <b>{t('project.dataModeling.inheritance')}:</b> <b>{t('project.dataModeling.baseEntity')}</b> {t('project.dataModeling.inheritance.description')}
            </li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
    // TC:dataModeling.otherCommonFields
}

@Entity
public class Board extends BaseEntity {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Member writer;

    @OneToMany(mappedBy = "board")
    private List<BoardImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "board")
    private List<BoardReply> replies = new ArrayList<>();
    // TC:dataModeling.otherFields
}

@Entity
public class BoardImage {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    private Board board;
    // TC:dataModeling.otherFields
}`}
          </TranslatedSyntaxHighlighter>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h4>{t('project.realTimeVideo.title')}</h4>
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.realTimeVideo.goal')}</b>
          <ul>
            <li>{t('project.realTimeVideo.feature1')}</li>
            <li>{t('project.realTimeVideo.feature2')}</li>
          </ul>
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.realTimeVideo.implementation')}</b>
          <ul>
            <li>
              <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.realTimeVideo.implementation.step1')}</span>
              <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.realTimeVideo.implementation.step2')}</span>
              <span style={{ display: 'block' }}>{t('project.realTimeVideo.implementation.step3')}</span>
            </li>
          </ul>
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.realTimeVideo.issues')}</b>
          <ul>
            <li>
              <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.realTimeVideo.issues.issue1')}</span>
              <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.realTimeVideo.issues.issue2')}</span>
              <span style={{ display: 'block' }}>{t('project.realTimeVideo.issues.issue3')}</span>
            </li>
          </ul>
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.realTimeVideo.solutions')}</b>
          <ul>
            <li>
              <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.realTimeVideo.solutions.solution1')}</span>
              <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.realTimeVideo.solutions.solution2')}</span>
              <span style={{ display: 'block' }}>{t('project.realTimeVideo.solutions.solution3')}</span>
            </li>
          </ul>
          <h4 style={{ marginTop: '2rem' }}>{t('project.realTimeVideo.frontendLogic')}</h4>
          <p>{t('project.realTimeVideo.frontendLogic.description')}</p>
          <TranslatedSyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`
// TC:webRtc.comment1
function connectWebSocket(roomId) {
    if (!roomId || isConnecting) return;
    isConnecting = true;
    log("WebSocket connection attempt...");

    const socket = new SockJS('/ws'); // TC:webRtc.comment2
    stompClient = Stomp.over(socket);
    stompClient.debug = null; // TC:webRtc.comment3

    stompClient.connect({}, frame => {
        isConnecting = false;
        log("WebSocket connection successful: " + frame);
        stompClient.subscribe('/topic/room/' + roomId, message => {
            const data = JSON.parse(message.body);
            if (data.userId !== userId) {
                 log("Signal message received: " + data.type + " from " + data.userId);
                handleSignal(data);
            }
        });
        sendSignal(roomId, { type: 'join' }); // TC:webRtc.comment4
    }, error => {
        isConnecting = false;
        log("WebSocket connection failed: " + error);
        setTimeout(() => connectWebSocket(roomId), 5000); // TC:webRtc.comment5
    });
}

// TC:webRtc.comment6
function sendSignal(roomId, data) {
    if (stompClient && stompClient.connected) {
        const message = JSON.stringify({ ...data, roomId, userId });
        stompClient.send('/app/signal/' + roomId, {}, message);
        log("Signal message sent: " + data.type);
    } else {
        log("WebSocket not connected - message sending failed: " + data.type); // TC:webRtc.comment7
    }
}

// TC:webRtc.comment8
function handleSignal(data) {
    const { type, sdp, candidate, userId: remoteId } = data;
    const pc = peerConnections[remoteId];

    switch (type) {
        case 'join': // TC:webRtc.comment9
            log("New participant joined: " + remoteId);
            createPeerConnection(remoteId, true); // TC:webRtc.comment10
            break;
        case 'offer': // TC:webRtc.comment11
            log("Offer received from: " + remoteId);
            if (!pc) createPeerConnection(remoteId, false);
            peerConnections[remoteId].setRemoteDescription(new RTCSessionDescription(sdp))
                .then(() => peerConnections[remoteId].createAnswer())
                .then(answer => peerConnections[remoteId].setLocalDescription(answer))
                .then(() => sendSignal(window.roomId, { type: 'answer', sdp: peerConnections[remoteId].localDescription, to: remoteId }))
                .catch(e => log("Offer processing error: " + e)); // TC:webRtc.comment12
            break;
        case 'answer': // TC:webRtc.comment13
            log("Answer received from: " + remoteId);
            if (pc) pc.setRemoteDescription(new RTCSessionDescription(sdp)).catch(e => log("Answer processing error: " + e)); // TC:webRtc.comment14
            break;
        case 'candidate': // TC:webRtc.comment15
            log("ICE Candidate received from: " + remoteId);
            if (pc) pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => log("ICE Candidate addition error: " + e)); // TC:webRtc.comment16
            break;
    }
}

// TC:webRtc.comment17
function createPeerConnection(remoteId, isOffer) {
    log("PeerConnection created for: " + remoteId + (isOffer ? " (Offer sent)" : "")); // TC:webRtc.comment18 TC:webRtc.comment19
    if (peerConnections[remoteId]) peerConnections[remoteId].close(); // TC:webRtc.comment20

    const pc = new RTCPeerConnection({ 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] });
    peerConnections[remoteId] = pc;

    // TC:webRtc.comment21
    if (localStream) {
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
        log("Local stream track added to: " + remoteId); // TC:webRtc.comment22
    }

    // TC:webRtc.comment23
    pc.onicecandidate = event => {
        if (event.candidate) {
            sendSignal(window.roomId, { type: 'candidate', candidate: event.candidate, to: remoteId });
        }
    };

    // TC:webRtc.comment24
    pc.ontrack = event => {
        log("Remote track received from: " + remoteId); // TC:webRtc.comment25
        let remoteVideo = document.getElementById('remoteVideo_' + remoteId);
        if (!remoteVideo) { /* TC:webRtc.comment26 */ }
        if (remoteVideo.srcObject !== event.streams[0]) {
            remoteVideo.srcObject = event.streams[0];
            log("Remote video stream set for: " + remoteId); // TC:webRtc.comment27
        }
    };
    
    // TC:webRtc.comment28
      pc.oniceconnectionstatechange = () => log("ICE state change: " + pc.iceConnectionState + " for " + remoteId);
    pc.onconnectionstatechange = () => log("Connection state change: " + pc.connectionState + " for " + remoteId);

    // TC:webRtc.comment29
    if (isOffer) {
        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer))
            .then(() => sendSignal(window.roomId, { type: 'offer', sdp: pc.localDescription, to: remoteId }))
            .catch(e => log("Offer creation error: " + e)); // TC:webRtc.comment30
    }
}

// TC:webRtc.comment31
document.addEventListener('DOMContentLoaded', () => {
    // TC:webRtc.initEvent
    if (window.roomId) connectWebSocket(window.roomId);
});`}
          </TranslatedSyntaxHighlighter>
          
          <ImageCaption>{t('project.realTimeVideo.demoImage')}</ImageCaption>
          {!showDemo ? (
            <DemoButton onClick={() => setShowDemo(true)}>
              {t('project.realTimeVideo.startDemo')}
            </DemoButton>
          ) : (
            <>
              <DemoButton onClick={() => setShowDemo(false)}>
                {t('project.realTimeVideo.endDemo')}
              </DemoButton>
              <PreviewBox>
                <PreviewFrame src="/webrtc-demo.html" title="WebRTC demo" />
              </PreviewBox>
            </>
          )}
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h4>{t('project.boardSystem.title')}</h4>
          
          <b style={{ display: 'block', marginTop: '1.5rem' }}>{t('project.boardSystem.goal')}</b>
          <p style={{ marginBottom: '1rem' }}>
            {t('project.boardSystem.description')}
          </p>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.boardSystem.implementation')}</b>
          <p style={{ marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.boardSystem.implementation.step1')}</span>
            <span style={{ display: 'block' }}>{t('project.boardSystem.implementation.step2')}</span>
          </p>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.boardSystem.potentialIssues')}</b>
          <p style={{ marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.boardSystem.issue1')}</span>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.boardSystem.issue2')}</span>
          </p>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.boardSystem.solutions')}</b>
          <p style={{ marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>{t('project.boardSystem.solution1')}</span>
            <span style={{ display: 'block' }}>{t('project.boardSystem.solution2')}</span>
          </p>

          <StyledSlider {...sliderSettings}>
            <div>
              <ProjectImage src="/images/board-list.png" alt="Board list screen" />
              <CarouselImageCaption>{t('project.boardSystem.carousel.boardList')}</CarouselImageCaption>
            </div>
            <div>
              <ProjectImage src="/images/board-view.png" alt="Board view screen" />
              <CarouselImageCaption>{t('project.boardSystem.carousel.boardView')}</CarouselImageCaption>
            </div>
            <div>
              <ProjectImage src="/images/board-write.png" alt="Board write screen" />
              <CarouselImageCaption>{t('project.boardSystem.carousel.boardWrite')}</CarouselImageCaption>
            </div>
            <div>
              <ProjectImage src="/images/board-search.png" alt="Board search result screen" />
              <CarouselImageCaption>{t('project.boardSystem.carousel.boardSearch')}</CarouselImageCaption>
            </div>
          </StyledSlider>

        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h4>{t('project.queryDsl.title')}</h4>
          
          <p style={{ marginBottom: '1rem', lineHeight: '1.7' }}>
            {t('project.queryDsl.description')}
            <br/>
            {t('project.queryDsl.additionalDescription')}
            <br/><br/>
            {t('project.queryDsl.introduction')}
            <br/><br/>
            {t('project.queryDsl.booleanBuilder')}
          </p>
          
          <ul>
            <li style={{ marginTop: '1.5rem' }}>
              <p><strong>{t('project.queryDsl.codeExample1')}:</strong></p>
              <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`// BoardSearchImpl.java / ExerciseSearchImpl.java
QBoard board = QBoard.board; // TC:boardSearch.qBoardComment
JPQLQuery<Board> query = from(board);

// TC:boardSearch.queryComment
if (keyword != null && !keyword.trim().isEmpty()) {
    query.where(board.title.contains(keyword));
}
// TC:boardSearch.basicCondition
query.where(board.bno.gt(0L));

// TC:boardSearch.dynamicCondition
// query.where(booleanBuilder);`}
              </TranslatedSyntaxHighlighter>
            </li>

            <li style={{ marginTop: '1.5rem' }}>
              <p><strong>{t('project.queryDsl.codeExample2')}:</strong></p>
              <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`// BoardSearchImpl.java / ExerciseSearchImpl.java
BooleanBuilder booleanBuilder = new BooleanBuilder();

// TC:booleanBuilder.comment1
String[] types = type.split(""); // TC:booleanBuilder.comment2
String keyword = pageRequestDTO.getKeyword();

if (type != null && types.length > 0 && keyword != null && !keyword.trim().isEmpty()) {
    // TC:booleanBuilder.comment3
    BooleanBuilder conditionBuilder = new BooleanBuilder();
    for (String t : types) {
        switch (t) {
            case "t": // TC:booleanBuilder.comment4
                conditionBuilder.or(board.title.contains(keyword));
                break;
            case "c": // TC:booleanBuilder.comment5
                conditionBuilder.or(board.content.contains(keyword));
                break;
            case "w": // TC:booleanBuilder.comment6
                conditionBuilder.or(board.writer.userName.contains(keyword));
                break;
        }
    }
    booleanBuilder.and(conditionBuilder); // TC:booleanBuilder.comment7
} // TC:booleanBuilder.comment8

// TC:booleanBuilder.comment9
query.where(booleanBuilder);`}
              </TranslatedSyntaxHighlighter>
            </li>
          </ul>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h4>{t('project.memberManagement.title')}</h4>
          <b>{t('project.memberManagement.goal')}</b>
          <ul>
            <li>{t('project.memberManagement.feature1')}</li>
            <li>{t('project.memberManagement.feature2')}</li>
          </ul>
          <b>{t('project.memberManagement.implementation')}</b>
          <ul>
            <li>{t('project.memberManagement.implementation.step1')}</li>
            <li>{t('project.memberManagement.implementation.step2')}</li>
          </ul>
          <b>{t('project.memberManagement.issues')}</b>
          <ul>
            <li>{t('project.memberManagement.issue1')}</li>
            <li>{t('project.memberManagement.issue2')}</li>
          </ul>
          <b>{t('project.memberManagement.solutions')}</b>
          <ul>
            <li>{t('project.memberManagement.solution1')}</li>
            <li>{t('project.memberManagement.solution2')}</li>
          </ul>
          
          <h4 style={{ marginTop: '2rem' }}>{t('project.memberManagement.security')}</h4>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.memberManagement.sessionManagement')}</b>
          <ul>
            <li>{t('project.memberManagement.sessionManagement.step1')}</li>
            <li>{t('project.memberManagement.sessionManagement.step2')}</li>
            <li>{t('project.memberManagement.sessionManagement.step3')}</li>
            <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`.sessionManagement(session -> session
    .sessionFixation().changeSessionId()
    .maximumSessions(1)
    .maxSessionsPreventsLogin(false)
    .expiredUrl("/member/login?expired"))  // TC:security.comment1`}
            </TranslatedSyntaxHighlighter>
          </ul>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.memberManagement.csrf')}</b>
          <ul>
            <li>{t('project.memberManagement.csrf.step1')}</li>
            <li>{t('project.memberManagement.csrf.step2')}</li>
            <li>{t('project.memberManagement.csrf.step3')}</li>
            <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`.csrf(csrf -> csrf.ignoringRequestMatchers(
    "/member/login", 
    "/member/join", 
    "/check/**", 
    "/member/check/**",
    "/qna/api/**"
))  // TC:security.comment2`}
            </TranslatedSyntaxHighlighter>
          </ul>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.memberManagement.dataConsistency')}</b>
          <ul>
            <li>{t('project.memberManagement.dataConsistency.step1')}</li>
            <li>{t('project.memberManagement.dataConsistency.step2')}</li>
            <li>{t('project.memberManagement.dataConsistency.step3')}</li>
            <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@Override
public int updateInfo(MemberDTO memberDTO) {  // TC:security.comment3
    try {
        // TC:memberManagement.findExistingMember
        Member member = memberRepository.findById(memberDTO.getMid()).orElseThrow();
        
        // TC:memberManagement.passwordEncryption
        if (memberDTO.getMpw() != null && !memberDTO.getMpw().isBlank()) {
            member.changePassword(passwordEncoder.encode(memberDTO.getMpw()));
        }

        // TC:memberManagement.selectiveUpdate
        if (memberDTO.getEmail() != null){
            member.changeEmail(memberDTO.getEmail());
        }
        // TC:memberManagement.otherFieldsUpdate
        
        // TC:memberManagement.transactionSave
        memberRepository.save(member);
        return 1;
    } catch (Exception e){
        e.printStackTrace();
        return 0;
    }
}`}
            </TranslatedSyntaxHighlighter>
          </ul>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.memberManagement.otherSecurity')}</b>
          <ul>
            <li>{t('project.memberManagement.otherSecurity.step1')}</li>
            <li>{t('project.memberManagement.otherSecurity.step2')}</li>
            <li>{t('project.memberManagement.otherSecurity.step3')}</li>
          </ul>
          
          <h4 style={{ marginTop: '2rem' }}>{t('project.memberManagement.mainScreen')}</h4>
          <p style={{ marginBottom: '1rem' }}>
            {t('project.memberManagement.mainScreen.description')}
          </p>
          
          <StyledSlider {...sliderSettings}>
            <div>
              <ProjectImage src="/images/member-login.png" alt="Login screen" />
              <CarouselImageCaption>{t('project.memberManagement.mainScreen.carousel.login')}</CarouselImageCaption>
            </div>
            <div>
              <ProjectImage src="/images/member-join.png" alt="Join screen" />
              <CarouselImageCaption>{t('project.memberManagement.mainScreen.carousel.join')}</CarouselImageCaption>
            </div>
            <div>
              <ProjectImage src="/images/member-mypage.png" alt="My page screen" />
              <CarouselImageCaption>{t('project.memberManagement.mainScreen.carousel.mypage')}</CarouselImageCaption>
            </div>
          </StyledSlider>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h4>{t('project.qnaSystem.title')}</h4>
          <p>{t('project.qnaSystem.description')}</p>
          <p>{t('project.qnaSystem.additionalDescription')}</p>
          <p>{t('project.qnaSystem.userRequirement')}</p>
          <p>{t('project.qnaSystem.implementation')}</p>
          <h4 style={{ marginTop: '2rem' }}>{t('project.qnaSystem.fileUploadTitle')}</h4>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.qnaSystem.fileUpload.controller')}</b>
          <p>{t('project.qnaSystem.fileUpload.description')}</p>
          <ul>
            <li>{t('project.qnaSystem.fileUpload.step1')}</li>
            <li>{t('project.qnaSystem.fileUpload.step2')}</li>
            <li>{t('project.qnaSystem.fileUpload.step3')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<?> registerQna(
        @ModelAttribute QnaDTO qnaDTO,
        @RequestParam(value = "imageFiles", required = false) MultipartFile[] imageFiles,
        @RequestParam(value = "content", required = false) String contentParam
) {
    try {
        log.info("QnaDTO information: {}", qnaDTO);
        log.info("Number of attached files: {}", (imageFiles != null ? imageFiles.length : 0));

        // TC:fileUpload.comment2
        if (qnaDTO.getTitle() == null || qnaDTO.getTitle().trim().isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Title is empty.");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        
        // TC:fileUpload.comment3
        QnaDTO savedDto = qnaService.register(qnaDTO, imageFiles);
        log.info("QnA registration successful: qno={}", savedDto.getQno());

        return ResponseEntity.ok(savedDto); // TC:fileUpload.comment4
    } catch (Exception e) {
        log.error("An error occurred while registering the question", e);
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "An error occurred while registering the question: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}`}
          </TranslatedSyntaxHighlighter>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.qnaSystem.fileStorageTitle')}</b>
          <p>{t('project.qnaSystem.fileStorage.description')}</p>
          <ul>
            <li>{t('project.qnaSystem.fileStorage.step1')}</li>
            <li>{t('project.qnaSystem.fileStorage.step2')}</li>
            <li>{t('project.qnaSystem.fileStorage.step3')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@Value("\${org.zerock.upload.path}") // TC:uploadConfig.comment1
private String uploadPath;

@PostConstruct // TC:uploadConfig.comment2
public void init() {
    try {
        java.nio.file.Files.createDirectories(Paths.get(uploadPath));
        log.info("File upload directory check/creation: {}", uploadPath);
    } catch (IOException e) {
        log.error("Upload directory creation failed: {}", e.getMessage());
    }
}

@Override
@Transactional // TC:fileStorage.comment1
public QnaDTO register(QnaDTO dto, MultipartFile[] imageFiles) {
    // TC:fileStorage.comment2
    Qna qna = Qna.builder()
            .title(dto.getTitle())
            .questionText(dto.getQuestionText())
            .writer(dto.getWriter())
            .build();
    Qna savedQna = qnaRepository.save(qna);
    
    // TC:fileStorage.comment3
    if (imageFiles != null && imageFiles.length > 0) {
        for (MultipartFile file : imageFiles) {
            if (!file.isEmpty()) {
                // TC:fileStorage.comment4
                String originalFilename = file.getOriginalFilename();
                String ext = originalFilename != null && originalFilename.contains(".") ? 
                    originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
                String storedFileName = UUID.randomUUID().toString() + ext;
                
                // TC:fileStorage.comment5
                try {
                    file.transferTo(new File(uploadPath, storedFileName));
                    
                    // TC:fileStorage.comment6
                    QnaImage qnaImage = QnaImage.builder()
                            .imageName(storedFileName)
                            .build();
                    savedQna.addImage(qnaImage); // TC:fileStorage.comment7
                } catch (IOException e) {
                    throw new RuntimeException("File upload failed: " + originalFilename, e);
                }
            }
        }
        // TC:fileStorage.comment8
        savedQna = qnaRepository.save(savedQna);
    }
    
    return convertToDTO(savedQna); // TC:fileStorage.comment9
}`}
          </TranslatedSyntaxHighlighter>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.qnaSystem.fileAccessTitle')}</b>
          <p>{t('project.qnaSystem.fileAccess.description')}</p>
          <ul>
            <li>{t('project.qnaSystem.fileAccess.step1')}</li>
            <li>{t('project.qnaSystem.fileAccess.step2')}</li>
            <li>{t('project.qnaSystem.fileAccess.step3')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`// TC:fileAccess.comment1
@GetMapping("/images/{imageId}")
public ResponseEntity<Resource> getImage(@PathVariable Long imageId) {
    try {
        // TC:fileAccess.getImageResource
        Resource imageResource = qnaService.getImageAsResource(imageId);

        // TC:fileAccess.determineMimeType
        String contentType = Files.probeContentType(Paths.get(imageResource.getURI()));
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        // TC:fileAccess.returnImageResource
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(imageResource);
    } catch (EntityNotFoundException e) {
        return ResponseEntity.notFound().build(); // 404 response
    } catch (IOException e) {
        return ResponseEntity.internalServerError().build(); // 500 response
    }
}

// TC:frontend.comment1
document.getElementById('qnaForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // TC:frontend.comment2

    const formData = new FormData(); // TC:frontend.comment3

    // TC:frontend.comment4
    formData.append('title', document.getElementById('title').value);
    formData.append('questionText', document.getElementById('content').value);

    // TC:frontend.comment5
    const fileInput = document.getElementById('imageFiles');
    if (fileInput.files) {
        for (let i = 0; i < fileInput.files.length; i++) {
            formData.append('imageFiles', fileInput.files[i]);
        }
    }

    // TC:frontend.comment6
    const csrfToken = '/* Thymeleaf CSRF  Token expression example */';
    const csrfHeaderName = '/* Thymeleaf CSRF  Header name expression example  */';
    const currentUser = null; // TC:frontend.comment12

    try {
        // TC:frontend.comment7
        const response = await fetch('/qna/api/register', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'TC:frontend.registrationError');
        }

        // TC:frontend.successProcessing
        const result = await response.json();
        window.location.href = \`/qna/view/\${result.qno}\`; // TC:frontend.comment8
    } catch (error) {
        console.error('Submit error:', error);
        alert(error.message);
    }
});`}
          </TranslatedSyntaxHighlighter>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.qnaSystem.frontendTitle')}</b>
          <p>{t('project.qnaSystem.frontend.description')}</p>
          <ul>
            <li>{t('project.qnaSystem.frontend.step1')}</li>
            <li>{t('project.qnaSystem.frontend.step2')}</li>
            <li>{t('project.qnaSystem.frontend.step3')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="html" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`<form id="qnaForm" action="/qna/api/register" method="POST" enctype="multipart/form-data" onsubmit="return false;">
    <input type="hidden" th:name="\${_csrf.parameterName}" th:value="\${_csrf.token}" />

    <input type="text" id="title" name="title" placeholder="Enter the title" required>
    <textarea id="content" name="questionText" placeholder="Enter the content" required></textarea>

    <div class="form-group">
        <label>Image</label>
        <div class="uploadHidden" style="display: none;">
            <input type="file" id="imageFiles" name="imageFiles" multiple accept="image/*">
        </div>
        <div id="dropZone" class="board-dropzone">
            <p>Drag and drop or click to select an image</p>
        </div>
        <div id="imagePreview" class="uploadResult"></div>
    </div>
    <button type="submit">Regist</button>
</form>`}
          </TranslatedSyntaxHighlighter>
          
          <StyledSlider {...sliderSettings}>
            <div>
              <ProjectImage src="/images/qna-list.png" alt="Q&A list screen" />
              <CarouselImageCaption>{t('project.qnaSystem.carousel.qnaList')}</CarouselImageCaption>
            </div>
            <div>
              <ProjectImage src="/images/qna-write.png" alt="Q&A write screen" />
              <CarouselImageCaption>{t('project.qnaSystem.carousel.qnaWrite')}</CarouselImageCaption>
            </div>
            <div>
              <ProjectImage src="/images/qna-view.png" alt="Q&A detail screen" />
              <CarouselImageCaption>{t('project.qnaSystem.carousel.qnaView')}</CarouselImageCaption>
            </div>
          </StyledSlider>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>{t('project.commonComponents.title')}</h3>
          <b>{t('project.commonComponents.goal')}</b>
          <p>{t('project.commonComponents.description')}</p>

          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.implementation')}</b>
          <p>{t('project.commonComponents.additionalDescription')}</p>

          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.keyFeatures')}</b>
          <p>{t('project.commonComponents.keyFeaturesDescription')}</p>
          
          <p>{t('project.commonComponents.solution')}</p>

          <h4 style={{ marginTop: '2rem' }}>{t('project.commonComponents.mainComponents')}</h4>
          
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.webMvcConfig')}</b>
          <ul>
            <li>{t('project.commonComponents.webMvcConfig.step1')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/favicon.ico")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(0); // TC:webMvcConfig.cacheDisable
    }
}`}
          </TranslatedSyntaxHighlighter>

          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.customSecurityConfig')}</b>
          <ul>
            <li>{t('project.commonComponents.customSecurityConfig.step1')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true) // TC:memberManagement.enableMethodSecurity
public class CustomSecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() { return request -> new CorsConfiguration().applyPermitDefaultValues(); }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.ignoringRequestMatchers("/api/**", "/check/**"))
                .authorizeHttpRequests(auth -> auth
                    .anyRequest().permitAll() // TC:memberManagement.pathAccessControl
                )
                .formLogin(form -> form
                    .loginPage("/member/login")
                    .successHandler(successHandler())
                    .failureUrl("/member/login?error=true")
                )
                .logout(logout -> logout
                    .logoutUrl("/member/logout")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID", "remember-me")
                    .logoutSuccessUrl("/")
                )
                .sessionManagement(session -> session
                    .sessionFixation().changeSessionId()
                    .maximumSessions(1)
                    .maxSessionsPreventsLogin(false)
                );
                // TC:memberManagement.exceptionHandlers
        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return (request, response, authentication) -> response.sendRedirect("/");
    }
}`}
          </TranslatedSyntaxHighlighter>

          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.webSocketConfig')}</b>
          <ul>
            <li>{t('project.commonComponents.webSocketConfig.step1')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
         registration.setMessageSizeLimit(1024 * 1024);
         registration.setSendBufferSizeLimit(2048 * 1024);
         registration.setSendTimeLimit(20 * 1000);
    }

    @Bean
    public TaskScheduler heartBeatScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(1);
        scheduler.setThreadNamePrefix("wss-heartbeat-");
        scheduler.initialize();
        return scheduler;
    }
}`}
          </TranslatedSyntaxHighlighter>

          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.uploadConfig')}</b>
          <ul>
            <li>{t('project.commonComponents.uploadConfig.step1')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@Configuration
@Log4j2
public class UploadConfig {
    @Value("\${org.zerock.upload.path}") // Spring Value annotation example
    private String uploadPath;

    @PostConstruct
    public void init() {
        try {
            Path directory = Paths.get(uploadPath);
            if (Files.notExists(directory)) {
                Files.createDirectories(directory);
                log.info("file upload directory created: {}", uploadPath);
            } else {
                 log.info("file upload directory check: {}", uploadPath);
            }
        } catch (IOException e) {
            log.error("file upload directory creation failed: {}", e.getMessage());
        }
    }
}`}
          </TranslatedSyntaxHighlighter>

          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.globalExceptionHandler')}</b>
          <ul>
            <li>{t('project.commonComponents.globalExceptionHandler.step1')}</li>
            <li>{t('project.commonComponents.globalExceptionHandler.step2')}</li>
            <li>{t('project.commonComponents.globalExceptionHandler.step3')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`// GlobalExceptionHandler.java (partial)
@RestControllerAdvice
@Log4j2
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        ProblemDetail detail = ProblemDetail.forStatusAndDetail(status, "Unsupported HTTP method.");
        // ... detail setting ...
        return ResponseEntity.status(status).body(detail);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> handleAllExceptions(Exception ex, WebRequest request) {
        log.error("unhandled exception occurred: {}", ex.getMessage(), ex);
        ProblemDetail detail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, "An internal server error occurred. Please contact the administrator.");
        // ... detail setting ...
        return ResponseEntity.internalServerError().body(detail);
    }
}

// CustomRestAdvice.java (partial)
@RestControllerAdvice
@Log4j2
public class CustomRestAdvice {
    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<Map<String, Object>> handleBindException(BindException e) {
        Map<String, String> fieldErrors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error -> fieldErrors.put(error.getField(), error.getDefaultMessage()));
        Map<String, Object> response = Map.of("error", "input value validation failed", "details", fieldErrors);
        log.warn("data binding error: {}", fieldErrors);
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        log.error("data integrity violation: {}", e.getMessage());
        Map<String, String> response = Map.of("error", "data processing conflict occurred (e.g. duplicate value)");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler({NoSuchElementException.class, EmptyResultDataAccessException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<Map<String, String>> handleNoSuchElementException(Exception e) {
        log.warn("data retrieval failed: {}", e.getMessage());
        Map<String, String> response = Map.of("error", "requested data not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}`}
          </TranslatedSyntaxHighlighter>

          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.customErrorController')}</b>
          <ul>
            <li>{t('project.commonComponents.customErrorController.step1')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`@Controller
public class CustomErrorController implements ErrorController {
    private static final String PATH = "/error";

    @RequestMapping(PATH)
    @ResponseBody
    public ResponseEntity<Map<String, Object>> handleError(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        String message = "An unknown error occurred.";

        if (status != null) {
            int statusCode = Integer.parseInt(status.toString());
            try {
                httpStatus = HttpStatus.valueOf(statusCode);
            } catch (IllegalArgumentException e) { // TC:errorController.undefinedStatusCode
                // undefined status code
            }
            message = switch (httpStatus) {
                case NOT_FOUND -> "The requested resource could not be found."; // TC:errorController.notFound
                case INTERNAL_SERVER_ERROR -> "An internal server error occurred."; // TC:errorController.internalError
                // ... other status code messages ...
                default -> httpStatus.getReasonPhrase(); // TC:errorController.defaultMessage
            };
        }

        Map<String, Object> body = new HashMap<>();
        body.put("status", httpStatus.value());
        body.put("error", httpStatus.getReasonPhrase());
        body.put("message", message);
        body.put("path", request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI));

        return ResponseEntity.status(httpStatus).body(body);
    }
}`}
          </TranslatedSyntaxHighlighter>

          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.thymeleaf')}</b>
          <ul>
            <li>{t('project.commonComponents.thymeleaf.step1')}</li>
          </ul>
          <TranslatedSyntaxHighlighter language="html" style={vscDarkPlus} customStyle={{ borderRadius: '8px', margin: '1rem 0', fontSize: '0.9rem' }}>
{`<!DOCTYPE HTML>
<html lang="ko" xmlns:th="http://www.thymeleaf.org" xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout" xmlns:sec="http://www.thymeleaf.org/extras/spring-security">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title layout:title-pattern="$CONTENT_TITLE - $LAYOUT_TITLE">WORK OUT</title>
    <link rel="icon" th:href="@{/favicon.ico}">
    <link rel="stylesheet" th:href="@{/assets/css/main.css}" />
    <th:block layout:fragment="css"></th:block>
</head>
<body>
    <div id="page-wrapper">
        <header id="header" th:replace="~{fragments/header :: headerFragment}"></header>
        <nav id="nav" th:replace="~{fragments/nav :: navFragment}"></nav>
        <section id="main" class="wrapper style1">
            <div class="container">
                <th:block layout:fragment="content"></th:block>
            </div>
        </section>
        <footer id="footer" th:replace="~{fragments/footer :: footerFragment}"></footer>
    </div>
    <script th:src="@{/assets/js/jquery.min.js}"></script>
    <script th:src="@{/assets/js/main.js}"></script>
    <script th:inline="javascript">
    /* Thymeleaf template example  */
    // TC:frontend.comment1
    const csrfToken = '/* Thymeleaf CSRF Token expression example */';
    const csrfHeaderName = '/* Thymeleaf CSRF header name expression example */';
    const currentUser = null; // TC:frontend.comment12
    </script>
    <th:block layout:fragment="script"></th:block>
</body>
</html>`}
          </TranslatedSyntaxHighlighter>
          <b style={{ marginTop: '1.5rem', display: 'block' }}>{t('project.commonComponents.concerns')}</b>
          <ul>
            <li>
              <b>{t('project.commonComponents.environmentalManagement')}</b>
              <br/>
              &rarr; <b>{t('project.commonComponents.environmentalSolution')}</b>
            </li>
            <li>
              <b>{t('project.commonComponents.inconsistentUserExperience')}</b>
              <br/>
              &rarr; <b>{t('project.commonComponents.userExperienceSolution')}</b>
            </li>
          </ul>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>{t('project.developmentEnvironment.title')}</h3>
          <p>{t('project.developmentEnvironment.description')}</p>
          <ul>
            <li><b>{t('project.developmentEnvironment.technology')}:</b> <b>{t('project.developmentEnvironment.springBoot')}</b> {t('project.developmentEnvironment.springBootDescription')}, <b>{t('project.developmentEnvironment.gradle')}</b> {t('project.developmentEnvironment.gradleDescription')}, <b>{t('project.developmentEnvironment.java')}</b> {t('project.developmentEnvironment.javaDescription')}, <b>{t('project.developmentEnvironment.staticResources')}</b> {t('project.developmentEnvironment.staticResourcesDescription')}</li>
            <li><b>{t('project.developmentEnvironment.deploymentConfiguration')}:</b> {t('project.developmentEnvironment.deploymentConfigurationDescription')}</li>
          </ul>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>{t('project.futureImprovements.title')}</h3>
          <ul>
            <li><b>{t('project.futureImprovements.mobileAppIntegration')}:</b> {t('project.futureImprovements.mobileAppIntegrationDescription')}</li>
            <li><b>{t('project.futureImprovements.realTimeNotificationSystem')}:</b> {t('project.futureImprovements.realTimeNotificationSystemDescription')}</li>
            <li><b>{t('project.futureImprovements.aiFunction')}:</b> {t('project.futureImprovements.aiFunctionDescription')}</li>
            <li><b>{t('project.futureImprovements.socialLogin')}:</b> {t('project.futureImprovements.socialLoginDescription')}</li>
          </ul>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>{t('project.closing.title')}</h3>
          <p>{t('project.closing.description')}</p>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>{t('project.experience.title')}</h3>
          <PreviewBox>
            <PreviewFrame
              src="https://capu.blog/"
              title={t('project.experience.preview')}
              allow="fullscreen; clipboard-read; clipboard-write"
            />
          </PreviewBox>
        </ProjectSection>

        <ProjectSection variants={itemVariants}>
          <h3>{t('project.serviceLinks.title')}</h3>
          <ul>
            <li>
              <StyledLink href="https://capu.blog/" target="_blank" rel="noopener noreferrer">
                {t('project.serviceLinks.ezpzService')}
              </StyledLink>
            </li>
            <li>
              <StyledLink href="https://github.com/kapu0377/new-workout" target="_blank" rel="noopener noreferrer">
                {t('project.serviceLinks.githubRepository')}
              </StyledLink>
            </li>
          </ul>
        </ProjectSection>

      </ContentWrapper>
    </ProjectDetailContainer>
  );
}