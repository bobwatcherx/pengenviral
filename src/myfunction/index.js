 import Swal from 'sweetalert2';


export  function simpanbokep(file) {
    let savedVideos = JSON.parse(localStorage.getItem('nonton-nanti')) || [];
    savedVideos.push(file);
    localStorage.setItem('nonton-nanti', JSON.stringify(savedVideos));
   Swal.fire({
      icon: 'success',
      title: 'Bokep Berhasil Disimpan',
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2000
    });
  }