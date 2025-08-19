window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if (!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);

            const scene = document.querySelector("a-scene");

            // Array of objects to add
            const objects = [
                { latOffset: 0.001, lonOffset: 0, color: 'red' },
                { latOffset: 0, lonOffset: 0.001, color: 'blue' },
                { latOffset: -0.001, lonOffset: -0.001, color: 'green' }
            ];

            objects.forEach(obj => {
                const entity = document.createElement("a-box");
                entity.setAttribute("scale", { x: 20, y: 20, z: 20 });
                entity.setAttribute('material', { color: obj.color });
                entity.setAttribute('gps-new-entity-place', {
                    latitude: e.detail.position.latitude + obj.latOffset,
                    longitude: e.detail.position.longitude + obj.lonOffset
                });
                scene.appendChild(entity);
            });

            testEntityAdded = true;
        }
    });
};
