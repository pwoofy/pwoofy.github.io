---
layout: guide
title: "Sanctuary Epoch - 100 Puzzles Guide"
banner: "/images/guides/sanctuary-epoch.png"
---

<link rel="stylesheet" href="/assets/css/sanctuary.css">
<script src="/assets/js/sanctuary.js" defer></script>

<div class="sanctuary-header">
  <h2>Puzzle Index</h2>
  <div class="sanctuary-controls">
    <button class="sort-btn active" data-sort="chrono">Chronological</button>
    <button class="sort-btn" data-sort="diff">By Difficulty</button>
  </div>
</div>

<div class="sanctuary-index" id="puzzle-index">
  {% for puzzle in site.data.sanctuary %}
    <a href="#puzzle-{{ puzzle.id }}" 
       class="puzzle-card" 
       style="--diff-color: {{ puzzle.color }};"
       data-chrono="{{ puzzle.id }}" 
       data-diff-sub="{{ puzzle.diff_sub }}">
      
      <!-- NEW: The Circle Icon -->
      <div class="puzzle-icon-wrapper">
        <img src="{{ puzzle.icon }}" alt="{{ puzzle.name }} Icon" class="puzzle-icon">
      </div>
      
      <div class="puzzle-meta">
        <span class="puzzle-id">#{{ puzzle.id }} - {{ puzzle.name }}</span>
        <span class="puzzle-diff-badge" style="background: {{ puzzle.color }};">
          {{ puzzle.diff_name }} ({{ puzzle.diff_sub }})
        </span>
      </div>
    </a>
  {% endfor %}
</div>

<hr class="sanctuary-divider">

<h2>Solutions</h2>

<h3 id="puzzle-1">1 - Search (4.0)</h3>

**Puzzle:** [https://sanctuaryepoch.neocities.org/search](https://sanctuaryepoch.neocities.org/search)  ![link](https://sanctuaryepoch.neocities.org/search.png)


**Puzzle Answer:** playplace  


**Solution:** 

This is an easy word search. 

![oh](/images/sanctuaryepoch/images/playplace.png)

The outlines of the words on the crossword grid clearly spell out **playplace**.

***

<h3 id="puzzle-2">2 - Duology (5.8)</h3>

**Puzzle:** ![duology](/images/sanctuaryepoch/images/duology.png)


**Puzzle Answer:** euclid  


**Solution:** 

The 26 in the image refers to the fact that there are 26 letters in the alphabet, but it does not indicate A1Z26. The 2 -> 2 indicates a combination of a cipher with two inputs with another cipher which also has two inputs, such as morse or binary. We can combine all these clues to interpret the solution, which is to encode all character into morse code, concatenating them, replacing the dots with 0 and dashes with a 1, and decoding the 8-bit ascii. You can do this in [Cyberchef](https://gchq.github.io/CyberChef/#recipe=To_Morse_Code('-/.','Space','Line%20feed')Remove_whitespace(true,true,false,true,true,false)Substitute('.-','01',false)From_Binary('Space',8)&input=cGFhIGphYSBwaW0gcHogcHggcGw) to obtain the answer, **euclid**.

<h3 id="puzzle-3">3 - Trilogy (7.7)</h3>

**Puzzle:** [https://sanctuaryepoch.neocities.org/trilogy](https://sanctuaryepoch.neocities.org/trilogy) ![link](https://sanctuaryepoch.neocities.org/trilogy.png)


**Puzzle Answer:** wickpubjug  


**Solution:**

There are a few aspects of this puzzle. The two biggest clue here are the strings “Is enough to frame a world of color” and “Into the perfect image”. Here, we encode 3.081 (including the dot) into hexahue (as indicated by "Is enough to frame a world of color"), to obtain this:

![link](/images/sanctuaryepoch/images/hexahue.png)

From here, we use the second part. THe "Into the perfect image" refers to Pictured as Perfect, which contains a custom-made cipher for it. 

![link](/images/sanctuaryepoch/images/pap.png)

Decoding the hexahue with Pictured as Perfect cipher, you get bpcjukguwi, which is anagrammed to be **wickpubjug**.

<h3 id="puzzle-4">4 - LAEOCHELDRTXTE (6.3)</h3>

**Puzzle:** LAEOCHELDRTXTE (yes, that's it)


**Puzzle Answer:** emporiums


**Solution:**

So the puzzle content is literally just the name...The name is LAEOCHELDRTXTE, which is an anagram of PLACEHOLDERTEXT without the starting letter P. You know what else is a placeholder text? Lorem Ipsum. If you remove the first character just as how it was done to “PLACEHOLDERTEXT” to get “LACEHOLDERTEXT”, you get “orem ipsum”...and if you anagram oremipsum you get **emporiums**.

<h3 id="puzzle-5">5 - Articulation (5.2)</h3>

**Puzzle:** ![link](/images/sanctuaryepoch/images/articulation.png)


**Puzzle Answer:** dreamsandnightmares


**Solution:**

Find the rule here means find the pattern. 1, 2, 3, 4, 5 is basically adding one. One. One + irophobia, you get Oneirophobia. Oneirophobia is the fear of dreams and going to sleep. If you consider the + to be dreams, the - is nightmares. Thus, the answer is dreamsandnightmares.

<h3 id="puzzle-6">6 - Elements (5.0)</h3>

**Puzzle:** [https://sanctuaryepoch.neocities.org/elements ](https://sanctuaryepoch.neocities.org/elements) ![link](https://sanctuaryepoch.neocities.org/elements.png)


**Puzzle Answer:** hotfudgesundae


**Solution:**

The image shows a bunch of links between fire, air and water. This combined with the infinite logo and the puzzle’s title all leads to [infinite craft](https://neal.fun/infinite-craft/).

By simply following the links, and fusing the correct elements in Infinite Craft based on the icons, you will eventually reach a hotfudgesundae, which is the answer.

![link](/images/sanctuaryepoch/images/hfs.png)

<h3 id="puzzle-7">7 - Onswer (5.3)</h3>

**Puzzle:** ![lol](/images/sanctuaryepoch/images/onser.png)


**Puzzle Answer:** trichloromethane


**Solution:**

“Onswer” (the puzzle title) is just “Answer” with one letter changed. I wonder if we can apply the same logic onto these words. 

Turns out, we can:

War -> Way
Hack -> Back
Machina -> Machine
Starving -> Starting
Budge -> Badge

The instructions are quite clear, use the wayback machine on the starting badge (“1 Puzzle completed”). We obtain [this](https://web.archive.org/web/20251216142239/https://www.roblox.com/badges/4060684560197810/1-Puzzle-Solved).

CH4 + Cl2 -> ???
⟳⟳ -> ANSWER (IN WORD)

CH4+ Cl2 produces chloromethane. If you repeat this reaction twice, you get chloroform, which is also **trichloromethane**. 


<h3 id="puzzle-8">8 - Golf (8.2)</h3>

**Puzzle:** [https://sanctuaryepoch.neocities.org/golf](https://sanctuaryepoch.neocities.org/golf) ![hi](https://sanctuaryepoch.neocities.org/golf.png)


**Puzzle Answer:** raceperf


**Solution:**

Let’s look at the hint first, “what’s better than a hole in one stroke”. Well with the golf theming of the puzzle, you may think the hint is referring to something in golf, but that’s not the case here. 

The hint is actually talking about letters (hence the “stroke” part) with holes in them. Taking all undercased letters with holes in them will give us abdegopq, this matches up with the length of the text in the bottom left corner!

Taking hehgoqww as the “par” and deducting it with the text we got earlier in a1z26, give us the numbers 73428276. 

Now, we use the image. The image is of a game called Super Golf in Roblox. In Super Golf, scoring of under pars have their own names and the lowest under par you can go is 8, which matches with numbers! Taking the first letters of the names based on the amount under par in order gives us **raceperf**, which is the final answer.

![link](/images/sanctuaryepoch/images/race.png)

<h3 id="puzzle-9">9 - The Door (7.8)</h3>

**Puzzle:** [https://sanctuaryepoch.neocities.org/thedoor](https://sanctuaryepoch.neocities.org/thedoor) ![hi](https://sanctuaryepoch.neocities.org/thedoor.png)


**Puzzle Answer:** whostherephosphene


**Solution:**

The image contains “knock knock”, which is referring to the famous “knock knock, who’s there” joke. The page tells us decoding the ciphertext with known ciphers wont help, but maybe we can try encoding a separate text. 

If you search “knock knock cipher” up, you can see the top results are actually tap code! Encoding “whosthere” in tap code using the most common grid (-J) gives:

..... ..  .. ...  ... ....  .... ...  .... ....  .. ...  . .....  .... ..  . .....

Which looks like nothing, until you overlay it with the text on the page:

![link](/images/sanctuaryepoch/images/guh.png)

That’s weird, the spacing is different. If you extract all letters under singular spaces, you get the word phosphene!

![link](/images/sanctuaryepoch/images/kk.png)

That isn't the final answer though, the page tells us that we gotta add what’s used to get the final answer before the actual final answer. This is obviously “whosthere”, meaning the final answer is **whostherephosphene**.

<h3 id="puzzle-10">10 - Snake (6.2)</h3>

**Puzzle:** [https://sanctuaryepoch.neocities.org/snake](https://sanctuaryepoch.neocities.org/snake) ![bleh](https://sanctuaryepoch.neocities.org/snake.png)


**Puzzle Answer:** polygenic


**Solution:**

Follow the rules:
- Reach the apple
- Make sure the path has minimal length and turns
- Make sure the position after the path does not result in death.

![link](/images/sanctuaryepoch/images/why.png)

The paths of the snakes spell out letters, GNCPLEOYI, which anagrams to **polygenic**, which is the final answer. (GOD PLEASE IS THERE A BETTER IMAGE)
