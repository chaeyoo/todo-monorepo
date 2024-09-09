# About TODO (할일에 대하여)

> 인증 기능을 가지는 간단한 투두관리 앱
> 

## 프로젝트 소개

간단한 모노레포 앱을 구성하며, 개발 과정과 구조에 대해 알아보기 위해 제작한 앱입니다.

## 기술 스택

**Language & Major Library**

- React, Typescript, zustand, Emotion

**Package Manager, Build tool**

- pnpm, Turbo, webpack

**Backend**

- Supabase

**CI/CD**

- Amplify

## DEMO
- [할일에 대하여](https://main.d38wyme95zjr0p.amplifyapp.com/)
- 테스트 계정: ID - test2@email.com | PW - 123456
<img src="https://github.com/user-attachments/assets/27d1f02f-c2fa-4c7a-83e0-2005134219ce" width="300" height="500"/>
<img src="https://github.com/user-attachments/assets/c4ad6cb4-e6bd-4bfb-b99b-664eb7cacd36" width="300" height="500"/>
<img src="https://github.com/user-attachments/assets/16c743fa-fcbb-4f8b-9f66-5ac115c692c0" width="300" height="500"/>

## 주요기능

**회원가입**

- 이메일, 비밀번호, 닉네임 설정

**로그인**

- 이메일, 비밀번호
- Supabase Authentication

**할일**

- 할일 등록
- 할일 수정
- 할일 완료/취소
- 할일 삭제

## 데이터 구조

```sql
create table public.todos (
	id uuid not null default extensions.uuid_generate_v4 (),
	title text not null,
	completed boolean null default false,
	created_at timestamp with time zone null default now(),
	updated_at timestamp with time zone null default now(),
	created_by uuid null,
	constraint todos_pkey primary key (id),
	constraint todos_created_by_fkey foreign key (created_by) references auth.users (id) on delete cascade
) tablespace pg_default;

create table public.profiles (
	id uuid not null,
	email text not null,
	nickname text null,
	created_at timestamp with time zone null default current_timestamp,
	constraint profiles_pkey primary key (id),
	constraint profiles_email_key unique (email),
	constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
) tablespace pg_default;
```

## 프로젝트구조

```
// todo-monorepo 폴더구조
todo-monorepo/
├── apps/
│   └── web/
│       ├── src/
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── pages/
│       │   ├── App.tsx
│       │   └── index.tsx
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   └── shared/
│       ├── src/
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── package.json
├── pnpm-workspace.yaml
└── turbo.json

// web 폴더구조
web/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   └── TodoForm.tsx
│   ├── store/
│   │   └── todoStore.ts
│   ├── styles/
│   │   └── theme.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json

// shared 폴더구조
shared/
├── src/
│   ├── types/
│   │   └── todo.ts
│   ├── utils/
│   │   └── todoUtils.ts
│   └── index.ts
├── package.json
└── tsconfig.json

```

1. **apps 폴더**: 실행 가능한 애플리케이션을 포함
    - 현재는 `web` 애플리케이션만 있음
    - 향후 다른 앱을 추가할 수 있는 구조
2. **packages 폴더**: 공유 라이브러리나 모듈을 포함
    - 현재는 `shared` 패키지만 있음
    - 공통 타입, 유틸리티 함수 등을 포함
3. **루트 레벨 설정 파일**:
    - `package.json`: 전체 프로젝트 의존성 관리
    - `pnpm-workspace.yaml`: pnpm 워크스페이스 설정
    - `turbo.json`: Turborepo 설정

## 프로젝트 시작하기

### 설치

```
pnpm i
```

### 실행

```
1. 로컬 실행 - pnpm run dev
2. 로컬 빌드 및 빌드 결과로 실행 - pnpm run preview
"scripts": {
"dev": "webpack serve --mode development --env environment=local",
"build": "webpack --mode production --env environment=production",
"build:local": "webpack --mode production --env environment=local",
"start": "serve -s dist",
"preview": "npm run build:local && npm run start"
},
```
