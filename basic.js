window.onload = () => {
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        if(!testEntityAdded) {
            alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
            // Add a box to the north of the initial GPS position
            const boxEntity = document.createElement("a-box");
            boxEntity.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            boxEntity.setAttribute('material', { color: 'red' } );
            boxEntity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude + 0.001,
                longitude: e.detail.position.longitude
            });

            const circleEntity = document.createElement("a-sphere");
            circleEntity.setAttribute("scale", {
                x: 20, 
                y: 20,
                z: 20
            });
            circleEntity.setAttribute('material', { color: 'green' } );
            circleEntity.setAttribute('gps-new-entity-place', {
                latitude: e.detail.position.latitude - 0.001,
                longitude: e.detail.position.longitude
            });



            document.querySelector("a-scene").appendChild(entity);
        }
        testEntityAdded = true;
    });
};