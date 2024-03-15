import {dood_domain,apikey} from '../../../base/config.js'

export async function load({params}){
	console.log("params",params.id)
	const get_totalpages = await fetch(dood_domain + "/file/list?key=" + apikey + "&page=1&fld_id=" + params.id)
	const gettotalpages = await get_totalpages.json()

	let totalpages = gettotalpages.result.total_pages
	const randomPage = Math.floor(Math.random() * totalpages) + 1;
	const response = await fetch(`${dood_domain}/file/list?key=${apikey}&page=${randomPage}&fld_id=${params.id}`);
    const item = await response.json();


	return {item}
}