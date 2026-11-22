from app.services.calculations import calculate_cadr, compare_emissions

def test_cadr_calculation():
    result = calculate_cadr(5, 4, 3, 5)
    assert result["room_volume_m3"] == 60
    assert result["recommended_cadr_m3_per_hour"] == 300

def test_emissions_comparison():
    result = compare_emissions(10, ["car", "cycle"])
    assert len(result) == 2
    assert result[0]["estimated_kg_co2e"] > result[1]["estimated_kg_co2e"]
