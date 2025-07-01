import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useAuth() {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    throwOnError: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Log authentication errors for debugging
  if (error) {
    console.warn('Authentication check failed:', error);
  }

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear();
      
      // Clear localStorage including onboarding completion
      localStorage.removeItem('oppb-onboarding-completed');
      localStorage.clear(); // Clear any other app-related data
      
      // Small delay to ensure state updates, then redirect
      setTimeout(() => {
        window.location.href = '/';
        window.location.reload();
      }, 100);
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Even if logout API fails, clear local state
      queryClient.clear();
      localStorage.removeItem('oppb-onboarding-completed');
      localStorage.clear();
      
      // Redirect anyway to ensure user is logged out on frontend
      setTimeout(() => {
        window.location.href = '/';
        window.location.reload();
      }, 100);
    }
  });

  const logout = () => {
    // Immediately clear the query cache to trigger re-render
    queryClient.setQueryData(["/api/auth/user"], null);
    
    // Execute the logout mutation
    logoutMutation.mutate();
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    isLoggingOut: logoutMutation.isPending,
  };
}
