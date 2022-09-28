import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

const baseUrl = "/api/v1/graffiti";

app.use(express.json());

app.post(baseUrl, async (request, response) => {
	const { name, description, location, createdAt } = request.body;

	const result = await prisma.graffiti.create({
		data: {
			name,
			description,
			location,
			createdAt,
		},
	});
	response.json(result);
});

app.get(baseUrl, async (request, response) => {
	const result = await prisma.graffiti.findMany();
	response.json(result);
});

app.get(`${baseUrl}/:id`, async (request, response) => {
	const { id } = request.params;
	const result = await prisma.graffiti.findUnique({
		where: {
			id: Number(id),
		},
	});
	response.json(result);
});

app.put(`${baseUrl}/:id`, async (request, response) => {
	const { id } = request.params;
	const { name, description, location, createdAt } = request.body;

	const result = await prisma.graffiti.update({
		where: {
			id: Number(id),
		},
		data: {
			name,
			description,
			location,
			createdAt,
		},
	});
	response.json(result);
});

app.delete(`${baseUrl}/:id`, async (request, response) => {
	const { id } = request.params;
	const result = await prisma.graffiti.delete({
		where: {
			id: Number(id),
		},
	});
	response.json(result);
});
