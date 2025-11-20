'use strict';
import {writeFileSync} from 'node:fs'
const checkList = [];
for (let y = 1; y <= 9; y++)
{
	for (let x = 1; x <= 9; x++)
	{
		const indexes = [];
		//Индексы по строкам
		for (let ix = 1; ix <= 9; ix++)
		{
			if (x !== ix) indexes.push(xyToIndex(ix, y));
		}
		//Индексы по столбцам
		for (let iy = 1; iy <= 9; iy++)
		{
			if (y !== iy) indexes.push(xyToIndex(x, iy));
		}
		//Индексы по квадратам
		{
			const ixStart = 3 * Math.floor((x - 1) / 3) + 1;
			const iyStart = 3 * Math.floor((y - 1) / 3) + 1;
			for (let ix = ixStart; ix < ixStart + 3; ix++)
			{
				for (let iy = iyStart; iy < iyStart + 3; iy++)
				{
					if (!(ix === x || iy === y)) indexes.push(xyToIndex(ix, iy));
				}
			}
		}
		checkList.push(indexes);
	}
}
writeFileSync('checkList.json', JSON.stringify(checkList))

function xyToIndex(x, y)
{
	return 9 * (y - 1) + x - 1;
}
