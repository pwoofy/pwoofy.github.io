---
layout: post
title: IrisCTF 2025 Writeups
categories: CTF
excerpt: Me and Untitled CTF Game locked in on this CTF. Damn crazy. Here's some writeups for the challenges I solved.
---

<h1>
    IrisCTF 2025 Writeups
</h1>

Peaked at 9th place, ended up at 34th place. Still one of the best performances we did as a team. I did a few, mostly RF and Network.

<h2>
    Radio Frequency / dotdotdot
</h2>

Challenge description:

```
Welcome to this year's RF category! Here's the usual legal disclaimer yada yada:

 

We are not lawyers. We're not your lawyers. This isn't legal advice.

 

When playing with radios, never transmit unless you know what you're doing. Always check your local laws and legislations before you transmit. In the United States, unauthorized transmission outside of certain frequency bands is illegal and can even be considered a felony offense in some cases. Radio frequency is cool, but don't get in trouble!

 

You do not need to transmit for any of these challenges. You do not need any radio hardware for any of these challenges. All of these challenges were made to be solved without the need for real-life hardware.

 

This disclaimer isn't meant to deter. It's meant to educate and communicate that you should educate yourself on the specific legalities for your locality if you want to dive into the world of RF. Once again, this is not legal advice, and you do not need to transmit for any of these challenges.

 

Now that we've gotten that out of the way, let's start with a simple challenge to prove some basic competency before we get into the more advanced stuff. This challenge will unlock the rest of the RF category.

 

I picked up this transmission, but it's way too noisy to make any sense of it. Can you give it a shot?

 

Flag format: irisctf{th3_m3ss4ge} in all lowercase. Replace spaces with underscores. Add curly braces.
```

With this challenge, we are given a file called dotdotdot.tar.gz, which unzips to reveal a file called dotdotdot.iq

> As an information, I will be writing my writeups for RF using the Universal Radio Hacker application. You can get it [here](https://github.com/jopohl/urh). I will also be using [audacity](https://www.audacityteam.org/) to do some stuff here.

Now that we get that out of the way, let's start with the dotdotdot.iq file. The easiest way to start is just to try to import this to audacity. We can do this by importing a raw file and selecting the dotdotdot.iq file.

Upon doing that, we are greeted with this:

![Morse](/images/blogimages/morsmorse.png)

Well, looks like it's morse. Just decode it normally.

`irisctf{n01s3_g0t_n0th1ng_0n_my_m0rse}`

Very easy.


<h2>
    Radio Frequency / RFoIP
</h2>

Challenge description:

```
"I found this radio station on the Internet."

 

"Like they continuously stream songs on YouTube or something?"

 

"No, it's like... a radio station, and they play... Well, it's hard to explain."
```

Additionally, we are given a connection to connect to.

`nc rfoip-620ac7b1.radio.2025.irisc.tf 6531`

Connecting to this through netcat, we can find that it is transmitting a file. If you just pipe it to another file, like:

`nc rfoip-620ac7b1.radio.2025.irisc.tf 6531 > output.raw`

We are able to save it to a .raw file. Keep the connection on for a while, and you might notice a strange part in the middle of the transmission.

![Looks like something odd](/images/blogimages/weirdsounds.png)

Turns out, if you crop it and get specifically that part, you are able to hear someone speaking the flag.
(Obviously you have to put this in audacity to hear it)

`irisctf{welcome_to_iris_radio_enjoy_surfing_the_waves}`

<h2>
    Networks / Shake My Hand
</h2>

WIP.

___

<h1>Final Thoughts</h1>

I think this CTF was one of the most fun CTFs that I played, was really satisfying to solve as well, hehe :3c

<h1>Additional Writeups</h1>

This section will link some challenges that aren't mentioned here that were solved by our team.

<h2>
Written by GrumpyC
</h2>

- [Miscellaneous / Cobra's Den](https://hackmd.io/@GrumpyC/H1ZVC3uI1x)
- [Networks / Inferno Barrier](https://hackmd.io/@GrumpyC/BkP9XGFLke)

    
<h2>
Written by Azazo
</h2>

- [Miscellaneous / O_WRONLY](https://azazazo.github.io/posts/irisctf25/#misc---o_wronly)
- [Cryptography / knutsacque](https://azazazo.github.io/posts/irisctf25/#crypto---knutsacque)
- [Cryptography / AYES](https://azazazo.github.io/posts/irisctf25/#crypto---ayes)

<h2>
Written by Xtrimi
</h2>

- [Forensics / deldeldel](https://xtrimi.github.io/posts/iris25/#deldeldel-50)
- [Forensics / Tracem 1](https://xtrimi.github.io/posts/iris25/#tracem-1-152)
- [OSINT / Late Night Bite](https://xtrimi.github.io/posts/iris25/#late-night-bite-50)
- [OSINT / where's bobby 2](https://xtrimi.github.io/posts/iris25/#wheres-bobby-2-50)
- [Web / Password Manager](https://xtrimi.github.io/posts/iris25/#password-manager-50)
- [Web / Political](https://xtrimi.github.io/posts/iris25/#political-50)
- [Web / Bad Todo](https://xtrimi.github.io/posts/iris25/#bad-todo-247)