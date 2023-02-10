function heroicInventory(input) {

    let hero = []
    let heroObj = {}

    for (const el of input) {
        let [name, level, items] = el.split(` / `)
        items = items.split(`, `);
        level = Number(level)

        heroObj = {
            name,
            level,
            items
        }
        hero.push(heroObj)
    }
    console.log(JSON.stringify(hero));
}
heroicInventory(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'])