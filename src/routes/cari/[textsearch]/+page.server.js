import {dood_domain,apikey} from '../../../base/config.js'

export async function load({params}){
	let searchparams = params.textsearch
	const response = await fetch(`${dood_domain}/search/videos?key=${apikey}&search_term=${searchparams}`);
    const item = await response.json();



	return {item,searchparams}
}