// 1부

/* 실습 1 : T 타입과 일치하는 속성만 제거하는 타입 만들기
type OmitByType<O, T> = {
  [K in keyof O as O[K] extends T ? never : K]: O[K];
};

type User = {
    name: string;
    age: number;
    married: boolean;
    rich: boolean;
};

type Result = OmitByType<{
    name: string;
    age: number;
    married: boolean;
    rich: boolean;
}, boolean>;
*/

// 실습 2 : 접근 제어자를 생성자의 매개변수에 설정해 코드를 간결하게 만들어 보세요
class ServiceDeveloper {
  constructor(
    public name: string,
    protected team: string,
    private service: string,
  ) {}

  introduce() {
    console.log(`저는 ${this.name}이고 ${this.service} 서비스를 개발합니다.`);
  }
}

// 실습 3 : map 메서드를 참고해서 forEach 메서드를 함수로 만들어 보세요
function projectForEach<T>(items: T[], callback: (item: T) => void) {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
}

// 실습 4 : Profile 인터페이스를 제네릭 인터페이스로 바꾸어 불필요한 타입 좁히기를 없애주세요
interface ClubMember {
  type: "member";
  club: string;
}

interface ServiceDeveloper {
  type: "developer";
  skill: string;
}

interface Profile<T> {
  name: string;
  profile: T;
}

function joinClub(user: Profile<ClubMember>) {
  if (user.profile.type !== "member") return;
  console.log(`${user.profile.club} 활동 시작`);
}

// =================================================
// 2부

// 실습 1 : T 타입과 일치하는 속성만 제거하는 타입 만들기
type OmitByType<O, T> = {
  [K in keyof O as O[K] extends T ? never : K]: O[K];
};

/*type User = {
  name: string;
  age: number;
  married: boolean;
  rich: boolean;
};*/

type Result = OmitByType<
  {
    name: string;
    age: number;
    married: boolean;
    rich: boolean;
  },
  boolean
>;

// 실습 2
// 1. 함수의 첫 번째 매개변수 타입을 추론하는 타입을 완성해보기
type FirstArg<T> = T extends (arg1: infer A, ...args: any[]) => any ? A : never;

type Fn1 = (name: string) => void;
type Fn2 = (x: number, y: string) => boolean;
type Fn3 = () => void;

type A = FirstArg<Fn1>;
type B = FirstArg<Fn2>;
type C = FirstArg<Fn3>;

// 실습 3
/*
interface User {
  name: string;
  age: number;
  email: string;
}

const user1: Partial<User> = {
  name: "Alice",
};

const user2: Required<User> = {
  name: "Bob",
  age: 25,
  email: "bob@example.com",
};

function register(user: Readonly<User>) {
  console.log("Registering: ", user);
}
register(user2);
*/
// 실습 4
type Permission = "read" | "write" | "delete";
type Role = "guest" | "user" | "admin";
type RolePermissions = Record<Role, Permission[]>;
const permissions: RolePermissions = {
  guest: ["read"],
  user: ["read", "write"],
  admin: ["read", "write", "delete"],
};

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
  createAt: string;
}
type PublicUser = Omit<User, "id" | "name" | "email" | "role">;
type AdminUser = Omit<User, "email" | "password">;

// 실습 5
type NotificationHandler =
  | { type: "email"; handler: () => { success: true; to: string } }
  | { type: "sms"; handler: () => { send: true; number: string } }
  | { type: "push"; handler: () => { delivered: boolean } }
  | { type: "slack"; handler: () => { ok: boolean; channel: string } };

type EmailHandler = Extract<NotificationHandler, { type: "email" }>;
type NonPushHandler = Exclude<NotificationHandler, { type: "push" }>;
