export type JwtPayload = {
	sub: number;
	userId: number;
	email: string;
	username: string;
	isLoggedIn?: boolean;
};
