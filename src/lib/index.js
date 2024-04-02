import {directlink_url} from '../base/config.js'

export function gotoplayer(file) {
  let opsi = [1, 2];
  let randomIndex = Math.floor(Math.random() * opsi.length); 
  let selectedOption = opsi[randomIndex]; 
  
  if (selectedOption === 2) {
    window.open(directlink_url,"_blank")
  } else {
    window.location.href = "/player/" + file.file_code
  }
}
