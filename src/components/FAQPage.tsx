import React, { useEffect, useState } from "react";
import { FAQ } from "../types/FAQ.tsx";
import FAQList from "./FAQList.tsx";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { FaqService } from "../services/FaqService.ts";

const FAQPage: React.FC = () => {
  const [allFAQs, setAllFAQs] = useState([] as FAQ[]);
  const [currentSize, setCurrentSize] = useState(9 as number);
  const [currentFAQs, setCurrentFAQs] = useState([] as FAQ[]);
  const [loading, setLoading] = useState(true as boolean);
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false as boolean);
  const [error, setError] = useState<string | undefined>(undefined);

  const loadFAQData = async () => {
    try {
      const { data, error } = await FaqService.fetchData();
      if (Array.isArray(data)) {
        setAllFAQs(data);
        setCurrentFAQs(data.slice(0, currentSize));
        setLoading(false);
        if (data.length < 9) {
          setIsLoadMoreDisabled(true);
        }
      } else {
        setError(error);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    loadFAQData();
  }, []);

  const styles = {
    container: {
      fontFamily: "Mr Eaves Modern Book",
      margin: "auto",
      width: "50%",
      minHeight: "85vh",
      textAlign: "center" as const,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      maxWidth: '550px',
    },
    loadMoreBtn: {
      "&:hover": {
        backgroundColor: "#f8f8f8",
        transition: "background-color 0.4s ease-in-out",
      },
      color: "#424242",
    },
    circularProgress: {
      color: "red",
    },
  };

  const loadMore = () => {
    const remainingFAQs = allFAQs.length - currentSize;
    const batchSize = Math.min(remainingFAQs, 9);

    if (batchSize > 0) {
      if (batchSize < 9) {
        setIsLoadMoreDisabled(true);
      }
      const newFAQs = allFAQs.slice(
        currentSize,
        currentSize + batchSize
      );
      setCurrentFAQs((prevFAQs) => [...prevFAQs, ...newFAQs]);
      setCurrentSize((prevSize) => prevSize + batchSize);
    }
  };

  return (
    <div style={styles.container}>
      {!error ? (
        !loading ? (
          <>
            <FAQList currentFAQs={currentFAQs} />
            {!isLoadMoreDisabled && (
              <Tooltip title="Load more questions">
                <Button
                  aria-label="Load More Frequently Asked Questions"
                  variant="text"
                  sx={styles.loadMoreBtn}
                  onClick={loadMore}
                  data-testid="loadMoreBtn"
                >
                  Load more
                </Button>
              </Tooltip>
            )}
          </>
        ) : (
          <CircularProgress
            size={100}
            thickness={5}
            sx={styles.circularProgress}
            data-testid="loadingSpinner"
          />
        )
      ) : (
        <div data-testid="errorMessage">{error}</div>
      )}
    </div>
  );
};

export default FAQPage;