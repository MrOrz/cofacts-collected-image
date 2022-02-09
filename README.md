# Cofacts collected images hashing visualization

This UI is designed to be running on local environment.
Due to the large payload size, it is not feasible to host it remotely.

## Up and running

After cloning the repo and running `npm i`:

1. Download all collected images and place it in `data/images` under project directory.
2. Run `npm run gen:hash` to generate perceptual hash JSON files under `data/`. It may take several hours.
3. Run `npm run gen:dist` to calculate distance between the hashes and generate result JSON file under `data/`. It may take several hours.
4. Run `npm start` and view the UI on `localhost:3000`.
