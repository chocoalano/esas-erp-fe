import Swal from 'sweetalert2'
export function requestNotificationPermission() {
  if (Notification.permission === 'default') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        alert('Notification permission denied.')
      }
    });
  }
}

export function showNotification(title, options) {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  } else {
    Swal.fire({
      title: 'Izin pemberitahuan',
      text: 'Kamu tidak mengizinkan ESAS memberikan pemberitahuan, hal ini akan memmbuat kamu tidak bisa mendapatkan informasi pemberitahuan mengenai administratif pada ESAS! Apakah kamu ingin memberikan ESAS izin untuk memberikan informasi ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, izinkan!',
      cancelButtonText: 'Tidak, jangan izinkan',
      customClass: {
        confirmButton: 'sweet-confirm-button-class',
        cancelButton: 'sweet-cancel-button-class',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        requestNotificationPermission()
      }
    });
  }
}
