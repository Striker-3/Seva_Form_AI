import copy

def map_to_form(entities, form_template):
    # Create a deep copy to avoid modifying the original template
    filled_form = copy.deepcopy(form_template)

    # Determine where the fields are (support both flat and nested 'fields' structure)
    target_dict = filled_form
    if "fields" in filled_form and isinstance(filled_form["fields"], dict):
        target_dict = filled_form["fields"]

    # Fill matching fields
    for field in target_dict:
        # Case insensitive mapping attempt if exact match fails
        if field in entities:
             target_dict[field] = entities[field]
        else:
            # Try lowercase match
            for ent_key, ent_val in entities.items():
                if ent_key.lower() == field.lower():
                    target_dict[field] = ent_val
                    break
    
    return filled_form
