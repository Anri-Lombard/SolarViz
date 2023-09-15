import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Reading the original CSV file again to plot only the non-null columns
original_df = pd.read_csv('Export_2023_09_01_2023_09_13.csv', delimiter=';')

# Identifying non-null columns (excluding the Timestamp for now)
non_null_columns = original_df.columns[original_df.notna().any()].tolist()
if 'Timestamp' in non_null_columns:
    non_null_columns.remove('Timestamp')

# Generating plots for each non-null column
fig, axes = plt.subplots(len(non_null_columns), 1, figsize=(15, 5 * len(non_null_columns)))

for i, col in enumerate(non_null_columns):
    sns.lineplot(data=original_df, x=original_df.index, y=col, ax=axes[i])
    axes[i].set_title(f"{col} Over Time (Non-Null Values)")
    axes[i].set_xlabel("Index")
    axes[i].set_ylabel(col)

plt.tight_layout()
plt.savefig('non_null_columns.png')
plt.show()
