# Gonsa (3D Experience for My Music)

## Inspiration

Audio visualizer is always an awesome idea to let you watch the music while listening to it.

![](https://ma-hub.imgix.net/wp-images/2020/07/15231555/Video-Effects-Audio-Visualizer.jpg)

There are a lot of 2D sound waves visualizer, but not many 3D ones.

![](https://steamuserimages-a.akamaihd.net/ugc/100603690267095854/9D7B84FE1FCE7E15EA2A1B18210B13C1C12242F1/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false)

I think the best way to visualize the sound is to use 3D sound waves, so that they are more visible than just 2D.

They will be more dynamic, more interesting, and more fun to watch and listen to.

As a music lover and amateur rapper back in high school, I want to build one on my own (maybe I can put my music into it to make it fully original).

## Tech Stack

- TypeScript
- Three.js
- Web Audio API
- Vite

with MVC models and classes.

## Design Style

Black and White, Simple, Minimal, Clean, Squared, Lightweight

Like [The Block Website](https://www.theblockcrypto.com), [Pianity Website](https://pianity.com)

## Components

1. Disco Sphere Class

    The sphere will be the main object placed in the middle. It will bounce based on the audio data. And change state (color, material) based on the audio data or the progression of the music.

2. Audio Input and player

    The audio player will be the source of the audio file. It can be a default file (to create a better unified style of the project) or inputted from user's choice. They should have a custom UI.

    Related materials: [Custom Audio Player from CSS-Tricks](https://css-tricks.com/lets-create-a-custom-audio-player/)

3. Audio Analyser

    The audio analyser will analyze the audio data by using the Web Audio API to get the data for further visualization. Pretty sure I will not use the analyser provided by Three.js.

4. Audio Visualizer

    The audio visualizer will convert the raw audio data into a 3D sound wave onto the disco sphere.

5. Interactive Control

    User will be able to control the sphere with keyboard inputs. So when the user presses the spacebar if will feel like they are clapping and creating another layer of beat to the whole music.

## Addition Notes

- The code should be as simple as possible and with comments.

- User guide should be documented.

## Timeline

4.13 - 4.17: Thinking more about the idea and design

4.18 - 4.22: Complete all the audio components

4.23 - 4.27: Complete all the visual and interactive components

4.28 -  DDL: Receive feedback and combine my original music to the project

## Some random design choices

- Why make font bold when hover?: Because when the bg is black and font is white, the text looks thinner.

- Why play button in the middle?: So that user will move away the cursor to see the full image. And they will find out actually mouse movement will trigger camera movement.

- Why not a perfect sphere when playing?: It looks more aggressive and dynamic with more variations.

## References

Some code snippets and logic are from: [this blog](https://medium.com/@mag_ops/music-visualiser-with-three-js-web-audio-api-b30175e7b5ba) (but the version the author used is not working, so all the codes are rewritten when I code my project).

Design is kinda inspired by [this project](https://jojo.ninja/fluctus/)

Music all be me.
