const BASE_URL = 'http://localhost:5000/api'

(() => {
    ['map-container', 'dates-container'].forEach(id => {
        document.getElementById(id).style['display'] = 'none'
    })
})()

const fetchData = async (params = "") => {
    const url = `${BASE_URL}/${params}`
    console.log(url);
    
    const response = await fetch(url)
    return await response.json()
}

const setImage =  async () => {
    const query = document.getElementById('query').value
    const urlAddition = [...document.getElementsByClassName('form-value')]
        .map(node => node.value)
        .filter(value => value !== '')
        .join('/')

    const { html } = await fetchData(`${query}/${urlAddition}`)
    document.getElementById("map").innerHTML = html
}

const router = {
    get_avg_deadly_grade_by_region_at_map: ['optional-container'],
    calculate_yearly_attack_percentage_change_by_region_at_map: ['optional-container'],
    get_sum_events_by_group_at_region_or_all_regions_at_map: ['region-container'],
    get_groups_with_shared_targets_at_map: ['optional-container'],
    get_number_of_unique_group_by_country_or_region_at_map: ['map-container'],
    get_groups_with_shared_attack_strategies_at_map: ['map-container'],
    get_attack_type_sort_by_most_deadly: [],
    get_five_groups_with_the_biggest_casualties: [],
    find_groups_with_shared_targets_in_same_year: [],
    find_groups_with_repeated_attacks_on_same_target_types: [],
    search/keywords: ['limit-container'],
    search/news: ['limit-container'],
    search/historic: ['limit-container'],
    search/combined: ['dates-container', 'limit-container']

}

document.getElementById("question").addEventListener("change",  ({ target: { value }}) => {
     const formValues = [...document.getElementsByClassName('form_values')]
     formValues.forEach(n => {
        n.style['display'] = 'none'
     }) 

     const elements = router[value].map(id => document.getElementById(id))
     elements.forEach(e => {
        e.style['display'] = 'block'
     })
})


