import {dood_domain,apikey} from '../base/config.js'

export async function load(){
	const get_totalpages = await fetch(dood_domain + "/file/list?key=" + apikey + "&page=1")
	const gettotalpages = await get_totalpages.json()

	let totalpages = gettotalpages.result.total_pages
	const randomPage = Math.floor(Math.random() * totalpages) + 1;
	const response = await fetch(`${dood_domain}/file/list?key=${apikey}&page=${randomPage}`);
    const item = await response.json();


	return {item}
}

