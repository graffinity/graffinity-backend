export type JwtPayload = {
	sub: number;
	userId: number;
	email: string;
	username: string;
	isAdmin: boolean;
	isLoggedIn?: boolean;
};
