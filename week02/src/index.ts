//실습1은 생략
//실습2

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

const developer = new ServiceDeveloper("승혜", "Frontend", "무야호");

developer.introduce();

//실습3
function projectForEach<T>(items: T[], callback: (item: T) => void) {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
}

projectForEach<number>([1, 2, 3], (item) => {
  console.log(item);
});
//실습4
interface ClubMember {
  type: "member";
  club: string;
}

interface ServiceDeveloper {
  type: "developer";
  skill: string;
}

interface Profile {
  name: string;
  profile: ClubMember | ServiceDeveloper;
}

function joinClub(user: Profile) {
  if (user.profile.type !== "member") return;
  console.log(`${user.profile.club} 활동 시작`);
}

const user: Profile = {
  name: "승혜",
  profile: {
    type: "member",
    club: "EFUB",
  },
};

joinClub(user);

//2부 실습1
type OmitByType<O, T> = {
  [K in keyof O as O[K] extends T ? never : K]: O[K];
};

type User = {
  name: string;
  age: number;
  married: boolean;
  rich: boolean;
};

type Result = OmitByType<
  {
    name: string;
    age: number;
    married: boolean;
    rich: boolean;
  },
  boolean
>;

//2부 실습2
type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never;

type Fn1 = (name: string) => void;
type Fn2 = (x: number, y: string) => boolean;
type Fn3 = () => void;

type A = FirstArg<Fn1>;
type B = FirstArg<Fn2>;
type C = FirstArg<Fn3>;

//2부 실습3
interface UserA {
  name: string;
  age: number;
  email: string;
}

const user1: Partial<User> = {
  name: "Alice",
};

const user2 = {
  name: "Bob",
  age: 25,
  email: "bob@example.com",
};

const user3: Readonly<UserA> = {
  name: "Charlie",
  age: 40,
  email: "charlie@example.com",
};

function register(user: Required<UserA>) {
  console.log("Registering:", user);
}

register(user2);

//2부 실습4
type Permission = "read" | "write" | "delete";
type Role = "guest" | "user" | "admin";
type RolePermissions = Record<Role, Permission[]>;
const permissions: RolePermissions = {
  guest: ["read"],
  user: ["read", "write"],
  admin: ["read", "write", "delete"],
};

interface UserB {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
  createAt: string;
}

type PublicUser = Pick<UserB, "id" | "name" | "email" | "role">;
type AdminViewUser = Omit<UserB, "email" | "password">;
