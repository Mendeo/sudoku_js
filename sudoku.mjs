'use strict';
import { readFileSync } from 'node:fs';

const checkList = JSON.parse(readFileSync('checkList.json'));
const file = process.argv[2];

const game = readGameFromFile(file);
console.log('input:');
beautifyGame(game);
console.log();

const V0 = findIndexV0(game);
//console.log(V0);

let gameVar = 1;
for (let v0 of V0.varr)
{
	game[V0.indexV0] = v0;
	const g = findGame(game, 0);
	if (g !== null)
	{
		console.log(`Var ${gameVar}`);
		beautifyGame(g);
		console.log();
		gameVar++;
	}
}

//Находим поле с максимально возможным числом возможных значений.
function findIndexV0(game)
{
	let indexV0 = 0;
	let varr = [];
	for (let i = 0; i < game.length; i++)
	{
		if (game[i] !== 0) continue;
		const values = [];
		for (let v = 1; v <= 9; v++)
		{
			if (chekValue(game, v, i))
			{
				values.push(v);
			}
		}
		if (values.length > varr.length)
		{
			varr = values;
			indexV0 = i;
		}
		if (varr.length === 9) break;
	}
	return { indexV0, varr };
}

function chekValue(game, value, index)
{
	if (index >= game.length || index < 0) throw new Error('Неверный индекс!');
	for (let i of checkList[index])
	{
		if (value === game[i]) return false;
	}
	return true;
}

function findGame(game, index)
{
	if (index === game.length) return game;
	if (game[index] !== 0) return findGame(game, index + 1);
	const gameCopy = new Array(game.length);
	for (let i = 0; i < game.length; i++)
	{
		gameCopy[i] = game[i];
	}
	for (let v = 1; v <= 9; v++)
	{
		if (chekValue(gameCopy, v, index))
		{
			gameCopy[index] = v;
			const nextGame = findGame(gameCopy, index + 1);
			if (nextGame !== null) return nextGame;
		}
	}
	return null;
}

function readGameFromFile(file)
{
	const data = readFileSync(file).toString().split('\n');
	while (data[data.length - 1] === '') data.pop();
	let game = [];
	for (let rowIndex = 0; rowIndex < data.length; rowIndex++)
	{
		let row = data[rowIndex];
		if (row[row.length - 1] === '\r') row = row.slice(0, row.length - 1);
		game = game.concat(row.split('').map(v => v === ' ' ? 0 : parseInt(v)));
	}
	return game;
}

function beautifyGame(game)
{
	for (let i = 0; i < 9; i++)
	{
		console.log(game.slice(i * 9, i * 9 + 9).join(' ').replace(/0/g, '-'));
	}
}
