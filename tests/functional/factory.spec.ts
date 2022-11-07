import { assert } from "@japa/preset-adonis";
import { test } from "@japa/runner";
import Aluno from "App/Models/Aluno";
import AlunoFactory from "Database/factories/AlunoFactory";
import PersonalFactory from "Database/factories/PersonalFactory";

import UserFactory from '../../database/factories/UserFactory'

test('should create one user', async () => {
    const user = await UserFactory.create();
})

test('should create Personal with user', async () => {
    const personal = await PersonalFactory.with('user',1).create();
})

test('should create Aluno with user and personal', async () => {
    const aluno = await AlunoFactory.with('user', 1).with('personal', 1).create();
})