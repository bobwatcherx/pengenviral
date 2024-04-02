import {dood_domain,apikey} from '../../../base/config.js'

export async function load({params}){
	let slugid = params.slug
	const response = await fetch(`${dood_domain}/file/info?key=${apikey}&file_code=${params.slug}`);
    const file_info = await response.json();


    // GET RANDOM DATA
    const get_totalpages = await fetch(dood_domain + "/file/list?key=" + apikey + "&page=1")
	const gettotalpages = await get_totalpages.json()

	let totalpages = gettotalpages.result.total_pages
	const randomPage = Math.floor(Math.random() * totalpages) + 1;
	const randomresponse = await fetch(`${dood_domain}/file/list?key=${apikey}&page=${randomPage}`);
    const item = await randomresponse.json();



	return {slugid,file_info,item}
}