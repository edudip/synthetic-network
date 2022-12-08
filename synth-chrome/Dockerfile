FROM syntheticnet:vnc

RUN apt-get --fix-broken install -y chromium && ln -s /usr/bin/chromium /usr/bin/google-chrome-stable

ENV USE_VNC=yes

ENV ENTRY="google-chrome-stable \
  --no-sandbox --disable-gpu --no-first-run \
  --disable-dev-shm-usage --disable-sync \
  --autoplay-policy=no-user-gesture-required  \
  --use-fake-ui-for-media-stream --use-fake-device-for-media-stream \
  --user-data-dir=/tmp/chrome --remote-debugging-port=9222 \
  --unsafely-treat-insecure-origin-as-secure=http://192.168.178.79:8446 \
  http://localhost http://192.168.178.79:8446/meeting/5/5?auth_key=d0tkStf7Xysgmr4e"

EXPOSE 5901/tcp
