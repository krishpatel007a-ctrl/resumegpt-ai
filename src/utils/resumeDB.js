import { supabase } from "./supabaseClient";

// Save or update resume
export async function saveResume(userId, resumeData, title = "My Resume") {
    // Check if resume already exists for this user
    const { data: existing } = await supabase
        .from("resumes")
        .select("id")
        .eq("user_id", userId)
        .single();

    if (existing) {
        // Update existing resume
        const { data, error } = await supabase
            .from("resumes")
            .update({
                data: resumeData,
                title,
                updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId)
            .select()
            .single();
        return { data, error };
    } else {
        // Create new resume
        const { data, error } = await supabase
            .from("resumes")
            .insert({
                user_id: userId,
                data: resumeData,
                title,
            })
            .select()
            .single();
        return { data, error };
    }
}

// Load resume for a user
export async function loadResume(userId) {
    const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", userId)
        .single();
    return { data, error };
}

// Make resume public and get share link
export async function toggleShareResume(userId, isPublic) {
    const { data, error } = await supabase
        .from("resumes")
        .update({ is_public: isPublic })
        .eq("user_id", userId)
        .select("share_id")
        .single();
    return { data, error };
}

// Load a public resume by share_id
export async function loadPublicResume(shareId) {
    const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("share_id", shareId)
        .eq("is_public", true)
        .single();
    return { data, error };
}