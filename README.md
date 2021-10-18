# Webpack 5 + PixiJS 

- Basis texture format loader demo

```
git clone git@github.com:sylwesterdigital/clean-webpack.git

cd clean-webpack
npm i

npm run start
```

local demo:
https://0.0.0.0:3030/
```

npm run build
```

# preview demo:
https://xr.workwork.fun/samsung/basis/

![Screenshot 2021-10-15 at 07 48 24](https://user-images.githubusercontent.com/27820237/137444688-8232fe83-6102-4ccf-8398-468b33842dff.png)

- Errors (browser console)
```
BaseTexture added to the cache with an id [assets/textures/basis/02.basis-1] that already had an entry
BaseTexture.addToCache @ core.js:980

BaseTexture added to the cache with an id [assets/textures/basis/02.basis] that already had an entry
BaseTexture.addToCache @ core.js:980

[.WebGL-0x7f81ea0a7000]GL ERROR :GL_INVALID_OPERATION : glCompressedTexImage2D: width or height invalid for level

```

it seems like texture has to be square of 2
![Screenshot 2021-10-15 at 08 30 42](https://user-images.githubusercontent.com/27820237/137449581-51642e3a-bda2-488a-8bc8-f5755e5f376a.png)

![Screenshot 2021-10-15 at 08 31 11](https://user-images.githubusercontent.com/27820237/137449599-54d104b3-1904-41c0-940a-f917c97b3e3d.png)


```
➜  png git:(main) ✗ basisu 02t.png                                                              
Basis Universal GPU Texture Compressor v1.15
Copyright (C) 2019-2021 Binomial LLC, All rights reserved
Using SSE 4.1: 1, Multithreading: 1, Zstandard support: 1
Processing 1 total file(s)
Read source image "02t.png", 256x256
Total basis file slices: 2
Slice: 0, alpha: 0, orig width/height: 256x256, width/height: 256x256, first_block: 0, image_index: 0, mip_level: 0, iframe: 0
Slice: 1, alpha: 1, orig width/height: 256x256, width/height: 256x256, first_block: 4096, image_index: 0, mip_level: 0, iframe: 0
Wrote output .basis/.ktx2 file "02t.basis"
Compression succeeded to file "02t.basis" size 9604 bytes in 0.133 secs


```



