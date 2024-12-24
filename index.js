const BASE_URL = 'http://localhost:5000/api'

const elementsIdsToHide = [
    'map-container', 'dates-container',
    'limit-container', 'keywords-container',
    'optional-container', 'region-container'
]

elementsIdsToHide.forEach(id => {
    document.getElementById(id).style['display'] = 'none'
})

const fetchData = async (params = "") => {
    const url = `${BASE_URL}/${params}`
    console.log(url);

    const response = await fetch(url)
    return await response.json()
}

const router = {
    get_avg_deadly_grade_by_region_at_map: ['optional-container'],
    calculate_yearly_attack_percentage_change_by_region_at_map: ['optional-container'],
    get_sum_events_by_group_at_region_or_all_regions_at_map: ['region-container'],
    get_groups_with_shared_targets_at_map: ['map-container'],
    get_number_of_unique_group_by_country_or_region_at_map: ['map-container'],
    get_groups_with_shared_attack_strategies_at_map: ['map-container'],
    get_attack_type_sort_by_most_deadly: [],
    get_five_groups_with_the_biggest_casualties: [],
    find_groups_with_shared_targets_in_same_year: [],
    find_groups_with_repeated_attacks_on_same_target_types: [],
    "search/keywords": ['limit-container', 'keywords-container'],
    "search/news": ['limit-container', 'keywords-container'],
    "search/historic": ['limit-container', 'keywords-container'],
    "search/combined": ['dates-container', 'limit-container', 'keywords-container']

}



document.getElementById("query").addEventListener("change", ({ target: { value } }) => {
    const formNodes = [...document.getElementsByClassName('form_values')]
    const formElementsIds = router[value]
    formNodes.forEach(node => {
        node.style['display'] = formElementsIds.includes(node.id) ? 'block' : 'none'
    })
})

const extractValuesFromInputs = () => [...document.getElementsByClassName("form_values")]
    .filter(n => n.style['display'] !== 'none')
    .flatMap(n =>
        [...n.childNodes]
            .filter(child => ['SELECT', 'INPUT']
                .includes(child.nodeName)
            )
    )

const formNodesToJson = (nodeList) => nodeList
    .reduce((obj, n) => ({ ...obj, [n.id]: n.value }), {})


const setImage = async () => {
    let query = document.getElementById('query').value
    
    const userInputs = formNodesToJson(extractValuesFromInputs())
    console.log(userInputs);
    

    const urlAddition = `${query}${userInputs['limit-number'] ? `/${userInputs['limit-number']}` : ''}`;
    const urlAddition2 = `${query}${userInputs['area-index'] ? `/${userInputs['user-index']}` : ''}`;

    if (userInputs['limit-number']) {
        query += `/${userInputs['limit-number']}`;
    }
    console.log(userInputs['area-index']);
    
    if (userInputs['area-index']) {
        query += `/${userInputs['area-index']}`;
    }

    if (userInputs['region-text']) {
        query += `/${userInputs['region-text']}`;
    }

    if (userInputs['map-index']) {
        query += `/${userInputs['map-index']}`;
    }

    if (userInputs['keywords-text']) {
        query += `/${userInputs['keywords-text']}`;
    }

    if (userInputs['start-date']) {
        query += `/${userInputs['start-date']}`;
    }

    if (userInputs['end-date']) {
        query += `/${userInputs['end-date']}`;
    }
    console.log(query);
    


    const { html } = await fetchData(`${query}`, {
        
    })
    document.getElementById("map").innerHTML = html
}