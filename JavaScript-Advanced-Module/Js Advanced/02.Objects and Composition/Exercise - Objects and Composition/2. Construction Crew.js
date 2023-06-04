function constructionCrew(worker) {

    if (worker.dizziness) {

        worker.levelOfHydrated += worker.weight * 0.1 * worker.experience;
        worker.dizziness = false;

    }
    




    return worker
}
let result = constructionCrew
    ({ weight: 120,

        experience: 20,
        
        levelOfHydrated: 200,
        
        dizziness: true })
    console.log(result);