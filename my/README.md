# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## 코드 스플리팅 및 로딩 UX 최적화 구조 (KOR)

### 1. 주요 페이지/섹션의 코드 스플리팅
- About, SkillsPage, ProjectsPage는 모두 `React.lazy`로 동적 import되어, 실제로 필요할 때만 로드됩니다.
- 각 컴포넌트는 `Suspense`로 감싸고, fallback으로 styled-components 기반의 `LoadingSpinner`를 사용합니다.
- 이를 통해 초기 번들 크기를 줄이고, 각 섹션이 처음 보여질 때 일관된 로딩 스피너가 노출됩니다.

### 2. 적용 예시
```jsx
const About = lazy(() => import('../components/About'));
const SkillsPage = lazy(() => import('./SkillsPage'));
const ProjectsPage = lazy(() => import('./ProjectsPage'));

<Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
  <About />
</Suspense>
<Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
  <SkillsPage />
</Suspense>
<Suspense fallback={<LoadingSpinner>컨텐츠 준비 중</LoadingSpinner>}>
  <ProjectsPage />
</Suspense>
```

### 3. 효과
- 모든 주요 섹션에서 일관된 로딩 UX 제공
- 코드 스플리팅이 정상적으로 동작하여, 초기 로딩 속도 및 번들 크기 최적화
- Vite 경고(정적+동적 import 혼용)도 해결됨

### 4. 참고
- `LoadingSpinner`는 `App.jsx`에서 export하여 여러 곳에서 재사용
- 글로벌 스타일(`GlobalStyles.js`)과 조화롭게 동작하도록 색상, 폰트 등 변수 사용
