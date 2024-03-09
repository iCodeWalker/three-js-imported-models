# Imported Models

    To create complex shapes, we better use a dedicated 3D software.
    Here we will use already made models.

    Imported models has many formats that we can use in three.js

    Popular Formats:
    1. OBJ
    2. FBX
    3. STL
    4. PLY
    5. COLLADA
    6. 3DS
    7. GLTF

    One Format is standard and we cover all our need : GLTF

    GLTF : GL Transmission Format

    Supports different sets of data like geometries, materials, camera, lights, scene graph, animations, skeletons, morphing etc.
    Various formats like json, binary, embed textures.

    When we use a model we have to keep in mind th weight of the file, how much time it takes to decompress, the data we need etc.

    link : https://github.com/KhronosGroup/glTF-Sample-Models

    A GLTF file can have different formats
    1. glTF
    2. glTF-Binary
    3. glTF-Draco
    4. glTF-Embedded

    The default format, multiple files
    1. glTF

    Duck.gltf is a json that contains, lights, scenes, materials, object transformations, but no geometries not textures.
    Duck0.bin is a binary that usually contains data like the geometries (vertices positions, UV coordinates, normals, colors etc).
    DuckCM.png is the texture.

    We load the Duck.gltf file and the other files should load automatically.

    2. glTF-Binary

    Only one file (Duck.glb)
    Contains all data
    Binary file
    Usually lighter in size
    Easier to load because only one file
    Harder to alter its data

    3. glTF-Draco

    like the glTF default format, but the buffer data is compressed using the Draco algorithm.
    Much lighter in size.

    4. glTF-Embedded

    One file like glTF-Binary format.
    The data is in json.
    Heavier in size.
    Has all data in file

## Load gltfLoader

const gltfLoader = new GLTFLoader();

// use the load() method.
gltfLoader.load(
// Path
"/models/Duck/glTF/Duck.gltf",
// success callback fuction
(gltf) => {
console.log("success");
console.log(gltf);
},
// progress callback function
(progress) => {
console.log("progress");
console.log(progress);
},
// error callback function
(error) => {
console.log("error");
console.log(error);
}
);

## We have multiple of ways to add the duck to our scene

1. Add the whole "scene" in our scene.
2. Add the children of the "scene" to our scene and ignore the Perspective Camera.
3. Filter the children before adding to the scene.
4. Add only the Mesh and end up with a duck with a wrong scale, position and rotation.
