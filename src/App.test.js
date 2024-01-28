import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import FAQPage from './components/FAQPage';
import FAQList from './components/FAQList';
import FAQItem from './components/FAQItem';
import { FaqService } from './services/FaqService';
import { mockFAQData } from './testData/mockFAQData';

const TEST_IDS = {
  faqList: 'faqList',
  loadMoreBtn: 'loadMoreBtn',
  faqQuestion: 'faqQuestion',
  faqAnswer: 'faqAnswer',
  errorMessage: 'errorMessage'
};

test('should display the "FAQs" header on the page', async () => {
  render(<App />)
  expect(screen.getByText('FAQs'))
});

test('should display the footer on the page', async () => {
  render(<App />)
  expect(screen.getByText('© [2024] Gautham. All rights reserved.'))
});

test('should display a loading spinner while fetching FAQs', async () => {
  render(<FAQPage />);
  const loadingSpinner = screen.getByTestId('loadingSpinner');
  expect(loadingSpinner).toBeInTheDocument();
});

test('should display the "Load More" button when more than the specified size of FAQs are available', async () => {
  jest.spyOn(FaqService, 'fetchData').mockResolvedValue({ data: mockFAQData });

  render(<FAQPage />);
  await waitFor(() => {
    const loadMoreButton = screen.getByTestId(TEST_IDS.loadMoreBtn);
    expect(loadMoreButton).toBeInTheDocument();
  });
});

test('should not display the "Load More" button when FAQs are fewer than the specified size', async () => {
  jest.spyOn(FaqService, 'fetchData').mockResolvedValue({ data: mockFAQData.slice(0,5) });

  render(<FAQPage />);
  await waitFor(() => {
    const loadMoreButton = screen.queryByTestId(TEST_IDS.loadMoreBtn); 
    expect(loadMoreButton).toBeNull();
  });
});

test('should display an error message when fetching FAQs fails and not load the spinner', async () => {
  jest.spyOn(FaqService, 'fetchData').mockResolvedValue({ error: 'No data found' });

  render(<FAQPage />);
  await waitFor(() => {
    const loadingSpinner = screen.queryByTestId('loadingSpinner');
    expect(loadingSpinner).toBeNull();
  });

  const errorMessage = await screen.findByTestId(TEST_IDS.errorMessage);
  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('No data found');
});

test('should load and display the given FAQs in the list', async () => {
  render(<FAQList currentFAQs={mockFAQData} />);

  mockFAQData.forEach((faq, index) => {
    const questionElement = screen.getByTestId(TEST_IDS.faqQuestion + (index + 1));
    expect(questionElement.textContent).toBe(faq.title);
  });
});

const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();

test('should expand the FAQ on clicking the question and display the correct answer', async () => {
  render(<FAQItem faq={mockFAQData[0]} />);

  fireEvent.click(screen.getByTestId(TEST_IDS.faqQuestion + "1"));
  const expectedText = normalizeText(mockFAQData[0].body);
  const receivedText = normalizeText(screen.getByTestId(TEST_IDS.faqAnswer + "1").textContent);

  expect(receivedText).toEqual(expectedText);
});

test('should expand a single FAQ when clicking a question and not others', async () => {
  render(<FAQList currentFAQs={mockFAQData} />);

  fireEvent.click(screen.getByTestId(TEST_IDS.faqQuestion + "1"));

  mockFAQData.forEach((faq, index) => {
    const answerElement = screen.queryByTestId(TEST_IDS.faqAnswer + (index + 1));

    if (index + 1 === 1) {
      expect(answerElement).toBeInTheDocument();
      expect(answerElement.textContent).toBe(faq.body);
    } else {
      expect(answerElement).toBeNull();
    }
  });
});

test('should have appropriate ARIA attributes for the FAQ list', async () => {
  render(<FAQList currentFAQs={mockFAQData} />);

  const faqList = screen.getByTestId(TEST_IDS.faqList);
  expect(faqList).toHaveAccessibleName('Frequently Asked Questions');
});

test('should have appropriate ARIA attributes for each Frequently Asked Question', async () => {
  render(<FAQList currentFAQs={mockFAQData} />);

  const faqQuestions = screen.getAllByRole("question");

  faqQuestions.forEach((item, index) => {
    expect(item).toHaveAccessibleName("Frequently Asked Question");
  });
});

test('should have appropriate ARIA attributes for the answer when a question is clicked', async () => {
  render(<FAQList currentFAQs={mockFAQData} />);

  fireEvent.click(screen.getByTestId(TEST_IDS.faqQuestion + "1"));
  
  const faqAnswers = screen.getAllByRole("answer");

  faqAnswers.forEach((item, index) => {
    if (index === 0) {
      expect(item).toHaveAccessibleName("Answer to FAQ");
    } else {
      expect(item).toBeNull();
    }
  });
});

test('should have Tooltip text when hovering over the "Load More" button', async () => {
  jest.spyOn(FaqService, 'fetchData').mockResolvedValue({ data: mockFAQData });

  render(<FAQPage />);
  await waitFor(() => {
    const loadMoreButton = screen.getByTestId(TEST_IDS.loadMoreBtn);
    fireEvent.mouseOver(loadMoreButton);
  });

  const tooltipText = await screen.findByText('Load more questions');
  expect(tooltipText).toBeInTheDocument();
});

test('should have Tooltip text when hovering over the question before answer expansion', async () => {
  render(<FAQItem faq={mockFAQData[0]} />);

  await waitFor(() => {
    const question = screen.getByTestId(TEST_IDS.faqQuestion + "1");
    fireEvent.mouseOver(question);
  });

  const tooltipText = await screen.findByText('Click to reveal the answer');
  expect(tooltipText).toBeInTheDocument();
});

test('should have Tooltip text when hovering over the question after answer expansion', async () => {
  render(<FAQItem faq={mockFAQData[0]} />);

  fireEvent.click(screen.getByTestId(TEST_IDS.faqQuestion + "1"));
  await waitFor(() => {
    const question = screen.getByTestId(TEST_IDS.faqQuestion + "1");
    fireEvent.mouseOver(question);
  });

  const tooltipText = await screen.findByText('Click to collapse the answer');
  expect(tooltipText).toBeInTheDocument();
});

test('should change the question color on hover', async () => {
  render(<FAQItem faq={mockFAQData[0]} />);

  await waitFor(() => {
    const question = screen.getByTestId(TEST_IDS.faqQuestion + "1");
    fireEvent.mouseEnter(question);
  });

  const questionElement = screen.getByTestId(TEST_IDS.faqQuestion + "1");
  expect(questionElement).toHaveStyle('color: #e10816');
});